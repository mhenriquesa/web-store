const Products = require('../models/Products');

exports.addProductScreen = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Gypsy Store - Add a product',
    path: '/admin/add-product',
  });
};

exports.allProducts = (req, res, next) => {
  Products.list(products => {
    res.render('admin/products', {
      pageTitle: 'Gypsy Store - Admin products',
      pageSubTitle: "Manage stores's products",
      products: products,
      path: '/admin/products',
    });
  });
};

exports.addProduct = (req, res, next) => {
  const newProduct = new Products(
    req.body.title,
    req.body.price,
    req.body.description,
    req.body.imageUrl
  );
  newProduct.save();

  res.redirect('/');
};
