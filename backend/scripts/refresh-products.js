const { Product, sequelize } = require('../models');

const products = [
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
];

async function main() {
  await sequelize.authenticate();
  await Product.destroy({ where: {} });
  await Product.bulkCreate(products);
  console.log(`Refreshed ${products.length} AGRABO products`);
  await sequelize.close();
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
