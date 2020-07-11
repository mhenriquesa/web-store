const fs = require('fs');
const path = require('path');
const db = require('../util/database');

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
    Products.list()
      .then(([rows, fieldData]) => {
        res.render('admin/products', {
          pageTitle: 'Gypsy Store - Admin products',
          pageSubTitle: "Manage stores's products",
          products: rows,
          path: '/admin/products',
        });
      })
      .catch(err => console.log(err));
  }

  static delete(productId) {
    Products.list()
      .then(([rows, fieldData]) => {
        const productIndex = rows.findIndex(item => item.id == productId);
        const currentProducts = [...rows];

        currentProducts.splice(productIndex, 1);

        fs.writeFile(productsDataPath, JSON.stringify(currentProducts), err => {
          if (err) console.log(err);
        });
      })
      .catch(err => console.log(err));
  }

  static list() {
    return db.execute('SELECT * FROM products');
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

  static findProductById(id) {
    return new Promise((resolve, reject) => {
      Products.list()
        .then(([rows, fieldData]) => {
          const product = rows.find(item => item.id === id);
          resolve(product);
        })
        .catch(err => reject(err));
    });
  }

  static getProductById(id) {
    return new Promise((resolve, reject) => {
      Products.list()
        .then(([rows, fieldData]) => {
          const product = rows.find(item => item.id == id);
          if (!product) return reject(`Product not found`);
          resolve(product);
        })
        .catch(err => console.log(err));
    });
  }
}

module.exports = Products;
