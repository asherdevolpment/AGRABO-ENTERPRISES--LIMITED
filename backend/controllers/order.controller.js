const { Customer, Order, OrderItem, Product, SiteSetting } = require('../models');

function money(amount) {
  return `UGX ${Number(amount || 0).toLocaleString('en-US')}`;
}

async function buildOrderItems(items) {
  const result = [];

  for (const item of items || []) {
    const product = await Product.findByPk(item.productId);
    if (!product) {
      throw new Error(`Product ${item.productId} not found`);
    }

    const quantity = Number(item.quantity || 1);
    result.push({
      ProductId: product.id,
      productName: product.name,
      productSize: product.size,
      quantity,
      unitPrice: product.price,
      lineTotal: product.price * quantity
    });
  }

  return result;
}

function buildWhatsappMessage(customer, items, order) {
  const lines = items.map((item) => {
    return `- ${item.productName} ${item.productSize} x${item.quantity} = ${money(item.lineTotal)}`;
  });

  return [
    'Hello AGRABO, I would like to place an order.',
    '',
    `Name: ${customer.name}`,
    `Phone: ${customer.phone}`,
    `Location: ${customer.location}`,
    'Order:',
    ...lines,
    `Delivery Fee: ${money(order.deliveryFee)}`,
    `Total: ${money(order.total)}`,
    '',
    `Payment: ${order.paymentMethod}`,
    `Notes: ${order.notes || 'None'}`
  ].join('\n');
}

async function createOrder(req, res) {
  try {
    const settings = await SiteSetting.findByPk(1);
    const deliveryFee = Number(req.body.deliveryFee ?? settings?.deliveryFee ?? 5000);
    const orderItems = await buildOrderItems(req.body.items);
    const subtotal = orderItems.reduce((sum, item) => sum + item.lineTotal, 0);
    const customer = await Customer.create(req.body.customer);
    const order = await Order.create({
      CustomerId: customer.id,
      paymentMethod: req.body.paymentMethod || 'Cash on Delivery',
      deliveryFee,
      subtotal,
      total: subtotal + deliveryFee,
      notes: req.body.notes
    });

    const whatsappMessage = buildWhatsappMessage(customer, orderItems, order);
    await order.update({ whatsappMessage });
    await OrderItem.bulkCreate(orderItems.map((item) => ({ ...item, OrderId: order.id })));

    const whatsappNumber = settings?.whatsappNumber || process.env.WHATSAPP_NUMBER || '256706506319';
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMessage)}`;

    return res.status(201).json({ orderId: order.id, whatsappMessage, whatsappUrl });
  } catch (error) {
    return res.status(400).json({ message: 'Could not create order', error: error.message });
  }
}

async function listOrders(req, res) {
  try {
    const orders = await Order.findAll({
      include: [Customer, OrderItem],
      order: [['createdAt', 'DESC']]
    });
    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: 'Could not load orders', error: error.message });
  }
}

async function getOrder(req, res) {
  try {
    const order = await Order.findByPk(req.params.id, { include: [Customer, OrderItem] });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    return res.json(order);
  } catch (error) {
    return res.status(500).json({ message: 'Could not load order', error: error.message });
  }
}

async function updateOrderStatus(req, res) {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    await order.update({ status: req.body.status });
    return res.json(order);
  } catch (error) {
    return res.status(400).json({ message: 'Could not update order status', error: error.message });
  }
}

module.exports = { createOrder, listOrders, getOrder, updateOrderStatus };
