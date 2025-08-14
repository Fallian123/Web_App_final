const { OrderItem } = require('../models');
const updateProductStock = require('../utils/updateProductStock');

exports.getAll = async (req, res, next) => {
  try {
    const items = await OrderItem.findAll();
    res.json(items);
  } catch (err) {
    console.error(err); // <--- Fehlerausgabe
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const item = await OrderItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const item = await OrderItem.create(req.body);
    await updateProductStock(item.product_id);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const item = await OrderItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });

    await item.update(req.body);
    await updateProductStock(item.product_id);
    res.json(item);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const item = await OrderItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });

    const productId = item.product_id;
    await item.destroy();
    await updateProductStock(productId);

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
