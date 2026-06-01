const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('BulkRequest', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  businessName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: { isEmail: true }
  },
  quantity: {
    type: DataTypes.STRING,
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('new', 'contacted', 'quoted', 'closed'),
    allowNull: false,
    defaultValue: 'new'
  }
}, {
  tableName: 'bulk_requests'
});
