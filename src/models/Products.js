const fs = require('fs');
const path = require('path');

const productsDataPath = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

class Products {
  constructor(name, price, description, image) {
    this.title = name;
    this.price = price;
    // this.description = description;
    // this.image = image;
  }

  save() {
    fs.readFile(productsDataPath, (err, fileContent) => {
      let products = err ? [] : JSON.parse(fileContent);
      products.push(this);

      fs.writeFile(productsDataPath, JSON.stringify(products), err => {
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
}

module.exports = Products;
