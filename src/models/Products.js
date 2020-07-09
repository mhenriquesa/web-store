const fs = require('fs');
const path = require('path');

const productsDataPath = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

class Products {
  constructor(name, price, description, image, id) {
    this.title = name;
    this.price = price;
    this.description = description;
    this.image = image;
    this.id = id;
  }

  updateProducts(products, newProduct = false) {
    if (newProduct) products.push(this);

    fs.writeFile(productsDataPath, JSON.stringify(products), err => {
      if (err) console.log(err);
    });
  }

  save() {
    Products.list(products => {
      if (this.id) {
        const productIndex = products.findIndex(item => item.id === this.id);
        const currentProducts = [...products];

        currentProducts[productIndex] = this;
        this.updateProducts(currentProducts);
      } else {
        this.id = Math.random().toString();
        this.updateProducts(products, true);
      }
    });
  }

  static delete(productId) {
    Products.list(products => {
      const productIndex = products.findIndex(item => item.id === productId);
      const currentProducts = [...products];

      currentProducts.splice(productIndex, 1);

      fs.writeFile(productsDataPath, JSON.stringify(currentProducts), err => {
        if (err) console.log(err);
      });
    });
  }

  static list(callback) {
    fs.readFile(productsDataPath, (err, fileContent) => {
      if (err) {
        console.log(err);
        return callback([]);
      }
      return callback(JSON.parse(fileContent));
    });
  }

  static getList() {
    return new Promise((resolve, reject) => {
      fs.readFile(productsDataPath, (err, fileContent) => {
        if (err) {
          console.log(err);
          return reject([]);
        }
        resolve(JSON.parse(fileContent));
      });
    });
  }

  static findProductById(id, callback) {
    Products.list(products => {
      const product = products.find(item => item.id === id);
      callback(product);
    });
  }

  static getProductById(id) {
    return new Promise((resolve, reject) => {
      Products.list(products => {
        const product = products.find(item => item.id === id);
        if (!product) return reject(`Product not found`);
        resolve(product);
      });
    });
  }
}

module.exports = Products;
