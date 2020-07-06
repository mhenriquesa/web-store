const Products = require('../models/Products');

exports.home = (req, res, next) => {
  Products.list(products => {
    res.render('shop', {
      pageTitle: 'Gypsy Store',
      products: products,
    });
  });
};

exports.pageNotFound = (req, res) => {
  res.status(404).render('404', { pageTitle: 'Gypsy Store - Page Not Found' });
};
