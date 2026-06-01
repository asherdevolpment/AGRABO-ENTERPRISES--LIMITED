const path = require('path');
const { Product } = require('../models');

function uploadPath(file) {
  return file ? `/uploads/${path.basename(file.filename)}` : undefined;
}

async function listProducts(req, res) {
  try {
    const products = await Product.findAll({ order: [['createdAt', 'DESC']] });
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ message: 'Could not load products', error: error.message });
  }
}

async function getProduct(req, res) {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.json(product);
  } catch (error) {
    return res.status(500).json({ message: 'Could not load product', error: error.message });
  }
}

async function createProduct(req, res) {
  try {
    const product = await Product.create({ ...req.body, imageUrl: uploadPath(req.file) });
    return res.status(201).json(product);
  } catch (error) {
    return res.status(400).json({ message: 'Could not create product', error: error.message });
  }
}

async function updateProduct(req, res) {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const nextValues = { ...req.body };
    if (req.file) {
      nextValues.imageUrl = uploadPath(req.file);
    }
    await product.update(nextValues);
    return res.json(product);
  } catch (error) {
    return res.status(400).json({ message: 'Could not update product', error: error.message });
  }
}

async function deleteProduct(req, res) {
  try {
    const deleted = await Product.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: 'Could not delete product', error: error.message });
  }
}

module.exports = {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
};
