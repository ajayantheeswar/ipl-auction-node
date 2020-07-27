const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ojunfuvj', 'ojunfuvj', 'Pyvn5R4UiPD3o-_-rLO6hHBrrCPDnpzW', {
  dialect: 'postgres',
  host: 'ruby.db.elephantsql.com',
  port: 5432
});



module.exports = sequelize;