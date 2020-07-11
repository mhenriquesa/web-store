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

  save() {
    return db.execute(
      'INSERT INTO products (title, price, description, image) VALUES (?, ?, ?, ?)',
      [this.title, this.price, this.image, this.description]
    );
  }

  static delete(productId) {
    return db.execute('DELETE FROM products WHERE id=?'[productId]);
  }

  static list() {
    return db.execute('SELECT * FROM products');
  }

  static getProductById(id) {
    return db.execute('SELECT * FROM products WHERE products.id=?', [id]);
  }
}

module.exports = Products;
