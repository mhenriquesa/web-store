const Products = require('../models/Products');

exports.addProductScreen = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Gypsy Store - Add a product',
    path: '/admin/add-product',
  });
};

exports.editProductScreen = (req, res, next) => {
  const editMode = req.query.edit;

  if (!editMode) return res.redirect('/');

  const productId = req.params.productId;

  Products.findProductById(productId, product => {
    if (!product) return res.redirect('/');

    res.render('admin/edit-product', {
      pageTitle: 'Gypsy Store - Products edition',
      path: '/admin/edit-product',
      product: product,
      editing: editMode,
    });
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
    req.body.imageUrl,
    null
  );
  newProduct.save();

  res.redirect('/');
};

exports.editProduct = (req, res, next) => {
  const newProduct = new Products(
    req.body.title,
    req.body.price,
    req.body.description,
    req.body.imageUrl,
    req.body.productId
  );
  console.log(newProduct);

  newProduct.save();
  res.redirect('/');
};
