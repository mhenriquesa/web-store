const path = require('path');
const dotenv = require('dotenv');
const mongodb = require('mongodb');
//--------------------------------

dotenv.config({ path: path.join(__dirname, '../.env') });

let accessDb = process.env.CONNECTIONSTRING;
let optionsDb = { useNewUrlParser: true, useUnifiedTopology: true };
let port = process.env.PORT;

if (port === null || port === '') return (port = 3000);

mongodb.connect(accessDb, optionsDb, (err, client) => {
  module.exports = client;
  const app = require('./app');
  app.listen(port);
});
