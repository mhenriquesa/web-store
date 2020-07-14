const express = require('express');
const router = express.Router();
const admController = require('../controllers/admController');

router.get('/products', admController.allProducts);

router.get('/add-product', admController.addProductScreen);
router.post('/add-product', admController.addProduct);

router.get('/edit-product/:productId', admController.editProductScreen);

router.post('/edit-product', admController.editProduct);
router.post('/delete-product', admController.deleteProduct);

module.exports = router;
