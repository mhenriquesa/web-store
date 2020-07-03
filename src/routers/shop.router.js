const path = require('path');
const rootDir = path.dirname(process.mainModule.filename);
const express = require('express');
const router = express.Router();
const { adminData } = require('./admin.router');

router.get('/', (req, res, next) => {
  res.render('shop', { pageTitle: 'Gypsy Store' });
});

module.exports = router;
