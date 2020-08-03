const {DataTypes} = require('sequelize');

const sequelize = require('../Database/Database')

const User = sequelize.define('user', {
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

module.exports = User;
