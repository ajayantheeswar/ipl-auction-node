const { DataTypes } = require('sequelize');

const sequelize = require('../Database/Database')

const AdminUser = sequelize.define('adminuser', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: DataTypes.STRING,
  email: {
    type:  DataTypes.STRING,
    allowNull : false,
    unique : true
  },
  password: DataTypes.STRING
});

module.exports = AdminUser;