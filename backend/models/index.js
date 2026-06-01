const sequelize = require('../config/database');

const Admin = require('./admin.model')(sequelize);
const Product = require('./product.model')(sequelize);
const Customer = require('./customer.model')(sequelize);
const Order = require('./order.model')(sequelize);
const OrderItem = require('./order-item.model')(sequelize);
const BulkRequest = require('./bulk-request.model')(sequelize);
const ContactMessage = require('./contact-message.model')(sequelize);
const SiteSetting = require('./site-setting.model')(sequelize);

Customer.hasMany(Order, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
Order.belongsTo(Customer);

Order.hasMany(OrderItem, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
OrderItem.belongsTo(Order);

Product.hasMany(OrderItem, { foreignKey: { allowNull: true }, onDelete: 'SET NULL' });
OrderItem.belongsTo(Product);

async function seedDefaults() {
  await SiteSetting.findOrCreate({
    where: { id: 1 },
    defaults: {
      whatsappNumber: process.env.WHATSAPP_NUMBER || '256706506319',
      phonePrimary: '0706506319',
      email: 'sales@agrabo.co.ug',
      location: 'Kampala, Uganda',
      deliveryAreas: 'Kampala and nearby areas'
    }
  });

  await Admin.findOrCreate({
    where: { email: 'admin@agrabo.local' },
    defaults: {
      name: 'AGRABO Admin',
      password: 'Admin@12345'
    }
  });

  const productCount = await Product.count();
  if (productCount === 0) {
    await Product.bulkCreate([
      {
        name: 'Deli Honey',
        size: '100g',
        description: 'Natural honey in a small starter jar.',
        price: 5000,
        stock: 40,
        imageUrl: '/assets/products/deli-honey-100g.png'
      },
      {
        name: 'Deli Honey',
        size: '250g',
        description: 'Natural honey for tea, breakfast, and daily use.',
        price: 13000,
        stock: 30,
        imageUrl: '/assets/products/deli-honey-250g.png'
      },
      {
        name: 'Deli Honey',
        size: '500g',
        description: 'A practical jar for regular honey lovers.',
        price: 30000,
        stock: 25,
        imageUrl: '/assets/products/deli-honey-500g.png'
      },
      {
        name: 'Deli Honey',
        size: '1kg',
        description: 'Best value pack for homes, offices, and resellers.',
        price: 55000,
        stock: 15,
        imageUrl: '/assets/products/deli-honey-1kg.png'
      },
      {
        name: 'Deli Honey',
        size: '1L',
        description: 'Premium honey bottle for regular household use.',
        price: 90000,
        stock: 12,
        imageUrl: '/assets/products/deli-honey-1l.png'
      },
      {
        name: 'Deli Honey',
        size: 'Bulk (5L - 20L)',
        description: 'Bulk supply for businesses, institutions, and resellers.',
        price: 0,
        stock: 10,
        imageUrl: '/assets/products/deli-honey-bulk.png'
      }
    ]);
  }
}

module.exports = {
  sequelize,
  Admin,
  Product,
  Customer,
  Order,
  OrderItem,
  BulkRequest,
  ContactMessage,
  SiteSetting,
  seedDefaults
};
