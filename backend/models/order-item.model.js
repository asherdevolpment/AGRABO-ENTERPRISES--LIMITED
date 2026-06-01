const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('OrderItem', {
  productName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  productSize: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  unitPrice: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  lineTotal: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'order_items'
});
