const { Op } = require('sequelize');
const { Order, Product, BulkRequest, ContactMessage } = require('../models');

async function summary(req, res) {
  try {
    const [
      totalOrders,
      pendingOrders,
      completedOrders,
      productStock,
      bulkRequests,
      recentMessages,
      completedRevenue
    ] = await Promise.all([
      Order.count(),
      Order.count({ where: { status: 'pending' } }),
      Order.count({ where: { status: 'completed' } }),
      Product.sum('stock'),
      BulkRequest.count(),
      ContactMessage.findAll({ limit: 5, order: [['createdAt', 'DESC']] }),
      Order.sum('total', { where: { status: { [Op.in]: ['completed', 'confirmed', 'delivering'] } } })
    ]);

    return res.json({
      totalOrders,
      pendingOrders,
      completedOrders,
      productsInStock: productStock || 0,
      bulkRequests,
      totalRevenue: completedRevenue || 0,
      recentMessages
    });
  } catch (error) {
    return res.status(500).json({ message: 'Could not load dashboard summary', error: error.message });
  }
}

module.exports = { summary };
