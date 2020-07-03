exports.addProductScreen = (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Gypsy Store - Add a product',
  });
};

const products = [];
exports.productsList = (req, res, next) => {
  return products;
};

exports.addProduct = (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect('/');
};
