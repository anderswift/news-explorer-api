require('dotenv').config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE: process.env.DATABASE || 'mongodb://localhost:27017/newsexplorerdb',
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || 'secret_salt',
};
