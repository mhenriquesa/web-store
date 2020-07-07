const Products = require('../models/Products');

exports.addProductScreen = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Gypsy Store - Add a product',
  });
};

exports.addProduct = (req, res, next) => {
  const newProduct = new Products(req.body.title, req.body.price);
  newProduct.save();

  res.redirect('/');
};
