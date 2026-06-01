const { ContactMessage } = require('../models');

async function createContactMessage(req, res) {
  try {
    const message = await ContactMessage.create(req.body);
    return res.status(201).json(message);
  } catch (error) {
    return res.status(400).json({ message: 'Could not send message', error: error.message });
  }
}

async function listContactMessages(req, res) {
  try {
    const messages = await ContactMessage.findAll({ order: [['createdAt', 'DESC']] });
    return res.json(messages);
  } catch (error) {
    return res.status(500).json({ message: 'Could not load messages', error: error.message });
  }
}

module.exports = { createContactMessage, listContactMessages };
