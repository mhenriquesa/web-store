const Products = require('../models/Products');
const Cart = require('../models/Cart');

exports.home = (req, res, next) => {
  Products.listAll()
    .then(result => {
      res.render('index', {
        pageTitle: 'Gypsy Store',
        products: result,
        path: '/',
      });
    })
    .catch(err => console.log(err));
};

exports.productScreen = (req, res, next) => {
  Products.findById(req.params.productId)
    .then(product => {
      console.log(product[0]);
      res.render('product-detail', {
        pageTitle: `Gypsy store - ${product[0].title}`,
        path: '/product-detail',
        product: product[0],
      });
    })
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Products.listAll()
    .then(result => {
      res.render('products-list', {
        pageTitle: 'Gypsy Store - All products',
        products: result,
        path: '/products',
      });
    })
    .catch(err => console.log(err));
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
