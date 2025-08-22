const { Order } = require('../models');

/**
 * Alle Bestellungen abrufen
 * 
 * Liefert Liste aller Bestellungen.
 */
exports.getAll = async (req, res, next) => {
  try {
    const items = await Order.findAll();
    return res.json(items);
  } catch (err) {
    console.error("❌ Fehler bei getAll Bestellungen:", err);
    return next(err);
  }
};

/**
 * Bestellung anhand ID abrufen
 * 
 * Sucht Bestellung per ID, 404 falls nicht vorhanden.
 */
exports.getById = async (req, res, next) => {
  try {
    const item = await Order.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: '❌ Bestellung nicht gefunden' });
    return res.json(item);
  } catch (err) {
    console.error("❌ Fehler bei getById Bestellung:", err);
    return next(err);
  }
};

/**
 * Bestellung erstellen
 * 
 * Legt neue Bestellung an.
 */
exports.create = async (req, res, next) => {
  try {
    const item = await Order.create(req.body);
    return res.status(201).json(item);
  } catch (err) {
    console.error("❌ Fehler bei create Bestellung:", err);
    return next(err);
  }
};

/**
 * Bestellung aktualisieren
 * 
 * Update Bestellung per ID mit den gesendeten Daten.
 */
exports.update = async (req, res, next) => {
  try {
    const item = await Order.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: '❌ Bestellung nicht gefunden' });
    await item.update(req.body);
    return res.json(item);
  } catch (err) {
    console.error("❌ Fehler bei update Bestellung:", err);
    return next(err);
  }
};

/**
 * Bestellung löschen
 * 
 * Löscht Bestellung per ID.
 */
exports.remove = async (req, res, next) => {
  try {
    const item = await Order.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: '❌ Bestellung nicht gefunden' });
    await item.destroy();
    return res.status(204).end();
  } catch (err) {
    console.error("❌ Fehler bei remove Bestellung:", err);
    return next(err);
  }
};
