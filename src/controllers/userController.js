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
      if (!user) return res.redirect('/');

      req.session.user = {
        username: user.username,
        id: user._id,
      };
      req.session.save(res.redirect('/'));
    })
    .catch(err => {
      console.log(err);
      res.redirect('/');
    });
};
