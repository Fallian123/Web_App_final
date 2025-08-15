const { Product } = require('../models');
const updateAllProductsStock = require('../utils/updateAllProductsStock');

exports.getAll = async (req, res, next) => {
  try {
    // Vor Abruf alle Bestände aktualisieren
    await updateAllProductsStock();

    const items = await Product.findAll();
    res.json(items);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    // Vor Abruf auch den einen Datensatz aktualisieren
    await updateAllProductsStock();

    const item = await Product.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });

    res.json(item);
  } catch (err) {
    next(err);
  }
};


exports.create = async (req, res, next) => {
  try {
    const item = await Product.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const item = await Product.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    await item.update(req.body);
    res.json(item);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const item = await Product.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    await item.destroy();
    res.status(204).end();
  } catch (err) {
    if (err.name === 'SequelizeForeignKeyConstraintError') {
      err.status = 409;
      err.message =
        'Produkt kann nicht gelöscht werden, da noch Bestellpositionen darauf verweisen.';
    }
    next(err);
  }
};
