const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
  dialect: 'postgres',
  host: 'url',
  port: 5432
});




module.exports = sequelize;