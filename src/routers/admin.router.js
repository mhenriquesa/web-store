const path = require('path');
const express = require('express');
const router = express.Router();

const products = [];

router.get('/add-product', (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Gypsy Store - Add a product',
  });
});

router.post('/add-product', (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect('/');
  console.log(products);
});

module.exports = {
  adminRouter: router,
  adminData: products,
};
