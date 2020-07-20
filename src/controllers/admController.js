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

  Products.findById(req.params.productId)
    .then(product => {
      if (!product) return res.redirect('/');

      res.render('admin/edit-product', {
        pageTitle: 'Gypsy Store - Products edition',
        path: '/admin/edit-product',
        product: product[0],
        editing: editMode,
      });
    })
    .catch(err => console.log(err));
};

exports.deleteProduct = (req, res, next) => {
  Products.deleteById(req.body.productId)
    .then(result => {
      res.redirect(`/admin/products`);
    })
    .catch(err => console.log(err));
};

exports.allProducts = (req, res, next) => {
  Products.listAll()
    .then(products => {
      res.render('admin/products', {
        pageTitle: 'Gypsy Store - Admin products',
        pageSubTitle: "Manage stores's products",
        products: products,
        path: '/admin/products',
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.addProduct = (req, res, next) => {
  const product = new Products(req.body);

  product
    .create()
    .then(() => res.redirect(`/`))
    .catch(err => console.log(err));
};

exports.editProduct = (req, res, next) => {
  Products.updateById(req.body)
    .then(() => res.redirect(`/admin/products`))
    .catch(err => console.log(err));
};
