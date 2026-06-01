const { BulkRequest } = require('../models');

async function createBulkRequest(req, res) {
  try {
    const request = await BulkRequest.create(req.body);
    return res.status(201).json(request);
  } catch (error) {
    return res.status(400).json({ message: 'Could not create bulk request', error: error.message });
  }
}

async function listBulkRequests(req, res) {
  try {
    const requests = await BulkRequest.findAll({ order: [['createdAt', 'DESC']] });
    return res.json(requests);
  } catch (error) {
    return res.status(500).json({ message: 'Could not load bulk requests', error: error.message });
  }
}

module.exports = { createBulkRequest, listBulkRequests };
