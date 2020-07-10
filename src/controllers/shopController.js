const Products = require('../models/Products');
const Cart = require('../models/Cart');

exports.home = (req, res, next) => {
  Products.list()
    .then(products => {
      res.render('index', {
        pageTitle: 'Gypsy Store',
        products: products[0],
        path: '/',
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.productScreen = (req, res, next) => {
  Products.findProductById(req.params.productId, product => {
    res.render('product-detail', {
      pageTitle: `Gypsy store - ${product.title}`,
      path: '/product-detail',
      product: product,
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

exports.getCart = async (req, res, next) => {
  let cart = await Cart.currentCart();

  res.render('cart', {
    pageTitle: 'Gypsy Store - Your cart',
    pageSubTitle: 'Manage your cart',
    path: '/cart',
    products: cart.products,
  });
};

exports.addToCart = (req, res, next) => {
  Cart.addToCart(req.body.productId);
  res.redirect('/cart');
};

exports.deleteFromCart = (req, res, next) => {
  Cart.deleteItem(req.body.productId);
  res.redirect('/cart');
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
    path: '/404',
  });
};
