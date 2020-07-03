const productsController = require('./productsController');
const Products = require('../models/Products');

exports.home = (req, res, next) => {
  res.render('shop', {
    pageTitle: 'Gypsy Store',
    products: Products.list,
  });
};

exports.pageNotFound = (req, res) => {
  res.status(404).render('404', { pageTitle: 'Gypsy Store - Page Not Found' });
};
