const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect: 'mysql',
    host: process.env.DB_HOST,
  }
);

module.exports = sequelize;
