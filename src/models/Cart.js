const Products = require('./Products');
const User = require('./Users');
const cartsCollection = require('../db').db().collection('carts');

class Cart {
  constructor(buyerId) {
    this.buyer = buyerId;
    this.products = [];
    this.value = 0;
  }

  static create(buyerId) {
    const cart = new Cart(buyerId);
    return cartsCollection.insertOne(cart);
  }

  addProduct() {}

  removeProduct() {}

  updateProduct() {}

  emptyCart() {}

  currentCart() {}
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
