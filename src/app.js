const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const shopRouter = require('./routers/shop.router');
const adminRouter = require('./routers/admin.router');

const publicPath = path.join(__dirname, '../public');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(publicPath));

// html templates
app.set('view engine', 'ejs');
app.set('views', 'src/views');

// Routers
app.use('/admin', adminRouter);
app.use(shopRouter);
app.use((req, res) => res.status(404).render('404'));

app.listen(3000);
