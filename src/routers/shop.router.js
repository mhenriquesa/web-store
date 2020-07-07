const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');

router.get('/', shopController.home);
router.get('/cart', shopController.getCart);
router.get('/orders', shopController.getOrders);
router.get('/products', shopController.getProducts);
router.get('/checkout', shopController.getCheckout);

router.get('*', shopController.pageNotFound);

module.exports = router;
