const { ObjectID } = require('mongodb');
const productsCollection = require('../db').db().collection('products');

class Products {
  constructor(data) {
    this.data = data;
  }

  create() {
    return productsCollection.insertOne(this.data);
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

  static updateById(id, updates) {
    return productsCollection.updateOne({ _id: new ObjectID(id) }, { $set: updates });
  }
}

module.exports = Products;
