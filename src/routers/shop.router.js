const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');

router.get('/', shopController.home);
router.get('/products', shopController.getProducts);
router.get('/products/:productId', shopController.productScreen);
router.get('/cart', shopController.getCart);
router.get('/orders', shopController.getOrders);
router.get('/checkout', shopController.getCheckout);

router.post('/cart', shopController.addToCart);

router.get('*', shopController.pageNotFound);

module.exports = router;
