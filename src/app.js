const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const publicPath = path.join(__dirname, '../public');

const shopRouter = require('./routers/shop.router');
const adminRouter = require('./routers/admin.router');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(publicPath));

// html templates
app.set('view engine', 'ejs');
app.set('views', 'src/views');

// Routers
app.use('/admin', adminRouter);
app.use(shopRouter);

app.listen(3000);
