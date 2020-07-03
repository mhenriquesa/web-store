const productsController = require('./productsController');

exports.home = (req, res, next) => {
  const productsList = productsController.productsList();

  res.render('shop', {
    pageTitle: 'Gypsy Store',
    products: productsList,
  });
};
