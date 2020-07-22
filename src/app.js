const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const shopRouter = require('./routers/shop.router');
const adminRouter = require('./routers/admin.router');
const dotenv = require('dotenv');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const User = require('./models/Users');

dotenv.config({ path: path.join(__dirname, '../.env') });

const sessionOptions = session({
  secret: process.env.SESSIONKEY,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: true },
  store: new MongoStore({ client: require('./db') }),
});

const publicPath = path.join(__dirname, '../public');

const app = express();

app.use(sessionOptions);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(publicPath));

// html templates
app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

// Routers
app.use('/admin', adminRouter);
app.use(shopRouter);

module.exports = app;
