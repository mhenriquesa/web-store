const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const shopRouter = require('./routers/shop.router');
const adminRouter = require('./routers/admin.router');

const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '../.env') });

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

let port = process.env.PORT;
if (port === null || port === '') return (port = 3000);
app.listen(port);
