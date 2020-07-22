const usersCollection = require('../db').db().collection('users');
const { ObjectID } = require('mongodb');
const bcryptjs = require('bcryptjs');

class User {
  constructor({ username, email, password, id }) {
    this.username = username;
    password ? (this.password = password) : '';
    id ? (this.id = id) : '';
    email ? (this.email = email) : '';
  }

  create() {
    const salt = bcryptjs.genSaltSync(10);

    this.password = bcryptjs.hashSync(this.password, salt);
    return usersCollection.insertOne(this);
  }

  login() {
    return new Promise((resolve, reject) => {
      usersCollection
        .findOne({ username: this.username })
        .then(attemptedUsername => {
          if (
            attemptedUsername &&
            bcryptjs.compareSync(this.password, attemptedUsername.password)
          ) {
            resolve(attemptedUsername);
          } else reject('User or pass invalid');
        })
        .catch(() => {
          reject('Please, try again in some minutes');
        });
    });
  }

  addToCart(productId) {
    console.log(this);
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
