const fs = require('fs');
const path = require('path');
const { call } = require('file-loader');

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

  static list(callback) {
    fs.readFile(productsDataPath, (err, fileContent) => {
      if (err) {
        console.log(err);
        return callback([]);
      }
      return callback(JSON.parse(fileContent));
    });
  }

  static findProductById(id, callback) {
    Products.list(products => {
      const product = products.find(item => item.id === id);
      callback(product);
    });
  }
}

module.exports = Products;
