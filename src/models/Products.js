const { ObjectID } = require('mongodb');
const productsCollection = require('../db').db().collection('products');

class Products {
  constructor({ title, price, imageUrl, description }) {
    this.title = title;
    this.price = price;
    this.image = imageUrl;
    this.description = description;
  }

  create() {
    return productsCollection.insertOne(this);
  }

  static listAll() {
    return productsCollection.find().toArray();
  }

  static findById(id) {
    return productsCollection.find({ _id: new ObjectID(id) }).toArray();
  }

  static deleteById(id) {
    return productsCollection.deleteOne({ _id: new ObjectID(id) });
  }

  static updateById({ productId, title, price, imageUrl, description }) {
    return productsCollection.updateOne(
      { _id: new ObjectID(productId) },
      { $set: { title, price, description, imageUrl } }
    );
  }
}

module.exports = Products;
