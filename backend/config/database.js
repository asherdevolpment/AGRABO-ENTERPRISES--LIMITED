const { Sequelize } = require('sequelize');
require('dotenv').config();

const databaseUrl = process.env.MYSQL_URL || process.env.DATABASE_URL;

const sequelize = databaseUrl
  ? new Sequelize(databaseUrl, {
      dialect: 'mysql',
      logging: false,
      dialectOptions: {
        ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined
      }
    })
  : new Sequelize(process.env.DB_NAME || 'agrabo_db', process.env.DB_USER || 'root', process.env.DB_PASSWORD || '', {
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT || 3306),
      dialect: 'mysql',
      logging: false
    });

module.exports = sequelize;
