const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('SiteSetting', {
  businessName: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'AGRABO Enterprises Limited'
  },
  whatsappNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phonePrimary: {
    type: DataTypes.STRING,
    allowNull: true
  },
  phoneSecondary: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true
  },
  deliveryFee: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 5000
  },
  deliveryAreas: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'site_settings'
});
