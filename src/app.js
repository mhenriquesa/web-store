const express = require('express');
const adminRoutes = require('./routers/admin.router');
const shopRoutes = require('./routers/shop.router');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// Routers
app.use(adminRoutes);
app.use(shopRoutes);
app.use((req, res) => res.status(404).send('<h1>page not found!</h1>'));

app.listen(3000);
