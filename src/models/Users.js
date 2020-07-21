const usersCollection = require('../db').db().collection('users');
const { ObjectID } = require('mongodb');
const bcryptjs = require('bcryptjs');

class User {
  constructor({ username, password, email }) {
    this.username = username;
    this.password = password;
    if (email) this.email = email;

    this.cart = {
      products: [],
      total: 0,
    };
  }

  create() {
    const salt = bcryptjs.genSaltSync(10);

    this.password = bcryptjs.hashSync(password, salt);
    return usersCollection.insertOne(this);
  }

  login() {
    return usersCollection
      .findOne({ username: this.username })
      .then(result => {
        if (result && bcryptjs.compareSync(this.password, result.password)) return result;
        return console.log('user or pass invalid');
      })
      .catch(err => {
        console.log(err);
      });
  }

  addToCart(productId) {
    // const updatedCart = {
    //   items: this.cart.products.concat([{ productId: new ObjectID(productId), qty: 1 }]),
    // };

    const updatedCart = Object.assign({}, this.cart, {
      products: this.cart.products.concat([{ id: productId, qty: 1 }]),
    });

    return usersCollection
      .updateOne({ _id: new ObjectID(this.id) }, { $set: updatedCart })
      .then(result => {
        console.log('Updated');
      })
      .catch(err => {
        console.log(err);
      });

    // Products.findById(productId)
    //   .then(result => {
    //     usersCollection.updateOne(
    //       { _id: new ObjectID(this.id) },
    //       {
    //         $set: {
    //           cart: Object.assign(
    //             {},
    //             this.cart,
    //             (cart.products = this.cart.products.concat([result.name]))
    //           ),
    //         },
    //       }
    //     );
    //   })
    //   .catch(err => console.log(err));
  }

  static findById(id) {
    return usersCollection
      .findOne({ _id: new ObjectID(id) })
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = User;
