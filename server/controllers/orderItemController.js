const { OrderItem } = require('../models');
const updateProductStock = require('../utils/updateProductStock');

/**
 * Alle Bestellpositionen abrufen
 * 
 * Liefert Liste aller Bestellpositionen.
 */
exports.getAll = async (req, res, next) => {
  try {
    const items = await OrderItem.findAll();
    return res.json(items);
  } catch (err) {
    console.error("❌ Fehler bei getAll OrderItems:", err);
    return next(err);
  }
};

/**
 * Einzelne Bestellposition abrufen
 * 
 * Sucht Bestellposition per ID, 404 falls nicht gefunden.
 */
exports.getById = async (req, res, next) => {
  try {
    const item = await OrderItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: '❌ OrderItem nicht gefunden' });
    return res.json(item);
  } catch (err) {
    console.error("❌ Fehler bei getById OrderItem:", err);
    return next(err);
  }
};

/**
 * Neue Bestellposition erstellen, danach Lagerbestand aktualisieren
 */
exports.create = async (req, res, next) => {
  try {
    const item = await OrderItem.create(req.body);
    await updateProductStock(item.product_id);
    return res.status(201).json(item);
  } catch (err) {
    console.error("❌ Fehler bei create OrderItem:", err);
    return next(err);
  }
};

/**
 * Bestellposition aktualisieren, danach Lagerbestand neu berechnen
 */
exports.update = async (req, res, next) => {
  try {
    const item = await OrderItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: '❌ OrderItem nicht gefunden' });
    await item.update(req.body);
    await updateProductStock(item.product_id);
    return res.json(item);
  } catch (err) {
    console.error("❌ Fehler bei update OrderItem:", err);
    return next(err);
  }
};

/**
 * Bestellposition löschen und Lagerbestand aktualisieren
 */
exports.remove = async (req, res, next) => {
  try {
    const item = await OrderItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: '❌ OrderItem nicht gefunden' });
    const productId = item.product_id;
    await item.destroy();
    await updateProductStock(productId);
    return res.status(204).end();
  } catch (err) {
    console.error("❌ Fehler bei remove OrderItem:", err);
    return next(err);
  }
};
