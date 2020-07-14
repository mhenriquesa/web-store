const usersCollection = require('../db').db().collection('users');

class Users {
  constructor(data) {
    this.data = data;
  }
}
