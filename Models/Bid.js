const {DataTypes} = require('sequelize');

const sequelize = require('../Database/Database')

const Bid = sequelize.define('bid', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  time : DataTypes.BIGINT.UNSIGNED,
  amount : DataTypes.DOUBLE,
  name : DataTypes.STRING
});

module.exports = Bid;