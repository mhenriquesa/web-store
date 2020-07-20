const usersCollection = require('../db').db().collection('users');

class Users {
  constructor({ name, email }) {
    this.name = name;
    this.email = email;
  }

  create() {
    return usersCollection.insertOne(this);
  }
}
