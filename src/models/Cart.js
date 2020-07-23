const Products = require('./Products');
const User = require('./Users');
const { ObjectID } = require('mongodb');
const cartsCollection = require('../db').db().collection('carts');

class Cart {
  constructor(buyerId) {
    this.buyer = buyerId;
    this.products = [];
  }

  static create(buyerId) {
    const cart = new Cart(new ObjectID(buyerId));
    return cartsCollection.insertOne(cart);
  }

  static addProduct(buyerId, productId) {
    Cart.getCurrentCart(buyerId)
      .then(cart => {
        const increaseQty = () => {
          return cart.products.map(element => {
            if (element.id == productId)
              return Object.assign({}, element, {
                qty: element.qty + 1,
              });
            return element;
          });
        };
        const appendProduct = () => {
          return cart.products.concat([{ id: new ObjectID(productId), qty: 1 }]);
        };

        const productExistsInCart = cart.products.find(element => {
          return element.id == productId;
        });

        const updatedProducts = productExistsInCart ? increaseQty() : appendProduct();

        cartsCollection.updateOne(
          { _id: new ObjectID(cart._id) },
          { $set: { products: updatedProducts } }
        );
      })
      .catch(err => console.log(err));
  }

  static removeProduct() {}

  static renderInfo(cart) {
    const productsInfo = cart.products.map(element => {
      return Products.findById(element.id).then(result => {
        return Object.assign({}, result, { qty: element.qty });
      });
    });

    return Promise.all(productsInfo).then(result => {
      const totalValue = result.reduce((acc, current) => {
        return acc + current.qty * current.price;
      }, 0);

      return { products: result, value: totalValue };
    });
  }

  updateProduct() {}

  emptyCart() {}

  static getCurrentCart(buyerId) {
    return new Promise((resolve, reject) => {
      cartsCollection
        .findOne({ buyer: new ObjectID(buyerId) })
        .then(result => {
          if (!result) {
            Cart.create(buyerId)
              .then(result => {
                console.log('We created a cart');
                resolve(result.ops[0]);
              })
              .catch(err => reject(err));
          } else {
            console.log('We found the cart');
            resolve(result);
          }
        })
        .catch(err => {
          reject('Please, try in a couple minutes');
        });
    });
  }
  // static currentCart() {
  //   return new Promise((resolve, reject) => {
  //     fs.readFile(cartDataPath, (err, fileContent) => {
  //       if (err) {
  //         console.log(err);
  //         return reject(`Cart not found`);
  //       }
  //       resolve(JSON.parse(fileContent));
  //     });
  //   });
  // }
  // static update(cart) {
  //   fs.writeFile(cartDataPath, JSON.stringify(cart), err => {
  //     if (err) throw err;
  //   });
  // }
  // static async deleteItem(productId) {
  //   const currentCart = await Cart.currentCart();
  //   const productToDelete = currentCart.products.filter(item => {
  //     return item.id === productId;
  //   });
  //   const updatedProducts = currentCart.products.filter(item => {
  //     return item.id !== productId;
  //   });
  //   const newCart = {
  //     products: updatedProducts,
  //     totalPrice:
  //       currentCart.totalPrice - productToDelete[0].price * productToDelete[0].qty,
  //   };
  //   Cart.update(newCart);
  // }
  // static async addToCart(productId) {
  //   const cart = await Cart.currentCart();
  //   let product = await Products.getProductById(productId);
  //   let productInCart = cart.products.filter(item => item.id === productId);
  //   if (productInCart.length) {
  //     cart.products.map(item => {
  //       if (item.id === productId)
  //         return Object.assign({}, item, { qty: (item.qty += 1) });
  //       return item;
  //     });
  //   } else cart.products.push(Object.assign({}, product, { qty: 1 }));
  //   cart.totalPrice += +product.price;
  //   Cart.update(cart);
  // }
}

module.exports = Cart;
