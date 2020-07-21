const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');
const userController = require('../controllers/userController');

router.get('/', shopController.home);
router.get('/products', shopController.getProducts);
router.get('/products/:productId', shopController.productScreen);

router.post('/register', userController.register);
router.post('/login', userController.login);

router.get('/cart', shopController.getCart);
router.get('/orders', shopController.getOrders);
router.get('/checkout', shopController.getCheckout);

router.post('/cart', shopController.addToCart);
router.post('/cart-delete-item', shopController.deleteFromCart);

router.get('*', shopController.pageNotFound);

module.exports = router;
