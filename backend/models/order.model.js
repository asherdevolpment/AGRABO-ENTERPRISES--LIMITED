const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('Order', {
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'delivering', 'completed', 'cancelled'),
    allowNull: false,
    defaultValue: 'pending'
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Cash on Delivery'
  },
  deliveryFee: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  subtotal: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  total: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  whatsappMessage: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'orders'
});
