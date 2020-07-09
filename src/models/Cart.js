const fs = require('fs');
const path = require('path');

const Products = require('./Products');

const cartDataPath = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

class Cart {
  static currentCart() {
    return new Promise((resolve, reject) => {
      fs.readFile(cartDataPath, (err, fileContent) => {
        if (err) {
          console.log(err);
          return reject(`Cart not found`);
        }
        resolve(JSON.parse(fileContent));
      });
    });
  }

  static update(cart) {
    fs.writeFile(cartDataPath, JSON.stringify(cart), err => {
      if (err) throw err;
    });
  }

  static async deleteItem(productId) {
    const currentCart = await Cart.currentCart();

    const productToDelete = currentCart.products.filter(item => {
      return item.id === productId;
    });

    const updatedProducts = currentCart.products.filter(item => {
      return item.id !== productId;
    });

    const newCart = {
      products: updatedProducts,
      totalPrice:
        currentCart.totalPrice - productToDelete[0].price * productToDelete[0].qty,
    };

    Cart.update(newCart);
  }

  static async addToCart(productId) {
    const cart = await Cart.currentCart();
    let product = await Products.getProductById(productId);
    let productInCart = cart.products.filter(item => item.id === productId);

    if (productInCart.length) {
      cart.products.map(item => {
        if (item.id === productId)
          return Object.assign({}, item, { qty: (item.qty += 1) });
        return item;
      });
    } else cart.products.push(Object.assign({}, product, { qty: 1 }));

    cart.totalPrice += +product.price;

    Cart.update(cart);
  }
}

module.exports = Cart;
