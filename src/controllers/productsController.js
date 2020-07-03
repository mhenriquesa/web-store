const Products = require('../models/Products');

exports.addProductScreen = (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Gypsy Store - Add a product',
  });
};

exports.addProduct = (req, res, next) => {
  Products.addProduct({ title: req.body.title });
  res.redirect('/');
};
