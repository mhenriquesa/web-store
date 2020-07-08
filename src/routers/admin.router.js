const express = require('express');
const router = express.Router();
const admController = require('../controllers/admController');

router.get('/products', admController.allProducts);

router.get('/add-product', admController.addProductScreen);
router.post('/add-product', admController.addProduct);

router.post('/edit-product', admController.editProduct);

router.get('/edit-product/:productId', admController.editProductScreen);

module.exports = router;
