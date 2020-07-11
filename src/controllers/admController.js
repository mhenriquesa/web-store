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

  Products.getProductById(req.params.productId)
    .then(product => {
      console.log(product);
      if (!product) return res.redirect('/');

      res.render('admin/edit-product', {
        pageTitle: 'Gypsy Store - Products edition',
        path: '/admin/edit-product',
        product: product,
        editing: editMode,
      });
    })
    .catch(err => {});
};

exports.deleteProduct = (req, res, next) => {
  Products.delete(req.body.productId);
  res.redirect('/admin/products');
};

exports.allProducts = (req, res, next) => {
  Products.list()
    .then(([rows, fieldData]) => {
      res.render('admin/products', {
        pageTitle: 'Gypsy Store - Admin products',
        pageSubTitle: "Manage stores's products",
        products: rows,
        path: '/admin/products',
      });
    })
    .catch(err => console.log(err));
};

exports.addProduct = (req, res, next) => {
  const newProduct = new Products(
    req.body.title,
    req.body.price,
    req.body.description,
    req.body.imageUrl,
    null
  );
  newProduct
    .save()
    .then(res.redirect('/'))
    .catch(err => console.log(err));
};

exports.editProduct = (req, res, next) => {
  const newProduct = new Products(
    req.body.title,
    req.body.price,
    req.body.description,
    req.body.imageUrl,
    req.body.productId
  );

  newProduct
    .save()
    .then(res.redirect('/'))
    .catch(err => console.log(err));
};
