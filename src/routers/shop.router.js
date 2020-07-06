const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');

router.get('/', shopController.home);
router.get('*', shopController.pageNotFound);

module.exports = router;
