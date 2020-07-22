const usersCollection = require('../db').db().collection('users');
const { ObjectID } = require('mongodb');
const bcryptjs = require('bcryptjs');

class User {
  constructor({ username, email, password }) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.cart = [];
    this.orders = [];
  }

  create() {
    const salt = bcryptjs.genSaltSync(10);

    this.password = bcryptjs.hashSync(this.password, salt);
    return usersCollection.insertOne(this);
  }

  login() {
    return new Promise((resolve, reject) => {
      usersCollection
        .findOne({ username: this.data.username })
        .then(attemptedUsername => {
          if (
            attemptedUsername &&
            bcryptjs.compareSync(this.data.password, attemptedUsername.password)
          ) {
            this.data = attemptedUsername;
            console.log(this.data);
            resolve('Welcome');
          } else reject('User or pass invalid');
        })
        .catch(() => {
          reject('Please, try again in some minutes');
        });
    });
  }

  addToCart(productId) {
    this.cart.concat([{ [productId]: 1 }]);
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
