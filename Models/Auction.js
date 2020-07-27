const {DataTypesSequelize , DataTypes} = require('sequelize');

const sequelize = require('../Database/Database')

const Auction = sequelize.define('auction', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name : DataTypes.STRING,
  battingStyle : DataTypes.STRING,
  average : DataTypes.STRING,
  role : DataTypes.STRING,
  start : DataTypes.STRING,
  end : DataTypes.STRING,
  isStarted : {
      type : DataTypes.BOOLEAN,
      defaultValue : false
  },
  isActive : {
    type : DataTypes.BOOLEAN,
    defaultValue : false
  },
  isSold : {
    type : DataTypes.BOOLEAN,
    defaultValue : false
  },
});

module.exports = Auction;