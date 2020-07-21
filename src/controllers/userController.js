const User = require('../models/Users');

exports.register = (req, res) => {
  new User(req.body)
    .create()
    .then(() => {
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.login = (req, res) => {
  new User(req.body)
    .login()
    .then(user => {
      res.redirect('/');
    })
    .catch(err => console.log(err));
};
