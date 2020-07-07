const express = require('express');
const router = express.Router();
const admController = require('../controllers/admController');

router.get('/add-product', admController.addProductScreen);
router.post('/add-product', admController.addProduct);

router.get('/products', admController.allProducts);

module.exports = router;
