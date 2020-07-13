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

  Products.findByPk(req.params.productId)
    .then(product => {
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
  Products.findByPk(req.body.productId)
    .then(product => {
      return product.destroy();
    })
    .then(result => {
      console.log(`Product destroyed!`);
      res.redirect('/admin/products');
    })
    .catch(err => {});
};

exports.allProducts = (req, res, next) => {
  Products.findAll()
    .then(result => {
      res.render('admin/products', {
        pageTitle: 'Gypsy Store - Admin products',
        pageSubTitle: "Manage stores's products",
        products: result,
        path: '/admin/products',
      });
    })
    .catch(err => console.log(err));
};

exports.addProduct = (req, res, next) => {
  Products.create({
    title: req.body.title,
    price: req.body.price,
    image: req.body.imageUrl,
    description: req.body.description,
  })
    .then(result => {
      res.redirect(`/admin/products`);
      console.log('Created Product');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.editProduct = (req, res, next) => {
  Products.findByPk(req.body.productId)
    .then(product => {
      product.title = req.body.title;
      product.price = req.body.price;
      product.description = req.body.description;
      product.image = req.body.imageUrl;

      return product.save();
    })
    .then(product => {
      console.log(product);
      res.redirect('/');
    })
    .catch(err => console.log(err));
};
