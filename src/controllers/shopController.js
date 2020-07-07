const Products = require('../models/Products');

exports.home = (req, res, next) => {
  Products.list(products => {
    res.render('index', {
      pageTitle: 'Gypsy Store',
      products: products,
      path: '/',
    });
  });
};

exports.getProducts = (req, res, next) => {
  Products.list(products => {
    res.render('products-list', {
      pageTitle: 'Gypsy Store - All products',
      products: products,
      path: '/products',
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render('cart', {
    pageTitle: 'Gypsy Store - Your cart',
    pageSubTitle: 'Manage your cart',
    path: '/cart',
  });
};

exports.getOrders = (req, res, next) => {
  res.render('orders', {
    pageTitle: 'Gypsy Store - Your orders',
    pageSubTitle: 'Manage your orders',
    path: '/orders',
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('checkout', {
    pageTitle: 'Gypsy Store - Checkout',
    pageSubTitle: '',
    path: '/checkout',
  });
};

exports.pageNotFound = (req, res) => {
  res.status(404).render('404', {
    pageTitle: 'Gypsy Store - Page Not Found',
    path: '*',
  });
};
