const path = require('path');
const express = require('express');
const adminRoutes = require('./routers/admin.router');
const shopRoutes = require('./routers/shop.router');
const bodyParser = require('body-parser');

const publicPath = path.join(__dirname, '../public');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(publicPath));
// Routers
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use((req, res) => res.status(404).sendFile(path.join(__dirname, './views/404.html')));

app.listen(3000);
