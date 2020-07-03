const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/add-product', productsController.addProductScreen);
router.post('/add-product', productsController.addProduct);

module.exports = router;
