const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('Customer', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'customers'
});
