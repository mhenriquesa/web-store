const User = require('../models/Users');
const Cart = require('../models/Cart');

const createSession = (session, { username, _id, email }) => {
  session.user = {
    username: username,
    id: _id,
    email: email,
  };
  session.save();
};

exports.register = (req, res) => {
  const user = new User(req.body);

  user
    .create()
    .then(info => {
      createSession(req.session, info.ops[0]);
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.login = (req, res) => {
  const user = new User(req.body);

  user
    .login()
    .then(attemptedUser => {
      createSession(req.session, attemptedUser);
      res.redirect('/');
    })
    .catch(err => {
      console.log('Hello from user login catch');
      console.log(err);
      res.redirect('/');
    });
};

exports.logout = (req, res) => {
  req.session.destroy(() => res.redirect('/'));
};

exports.userMustBeLoggedIn = (req, res, next) => {
  if (req.session.user) {
    req.currentUser = new User(req.session.user);
    next();
    return;
  }
  req.session.save(() => res.redirect('/'));
};
