const { Customer } = require('../models');

/**
 * Alle Kunden abrufen
 * 
 * Listet alle Kunden in der DB.
 * Antwort: JSON-Array.
 */
exports.getAll = async (req, res, next) => {
  try {
    const items = await Customer.findAll();
    return res.json(items);
  } catch (err) {
    console.error("❌ Fehler bei getAll Kunden:", err);
    return next(err);
  }
};

/**
 * Einzelnen Kunden abrufen
 * 
 * Sucht Kunden per ID, 404 bei Nichtfinden.
 */
exports.getById = async (req, res, next) => {
  try {
    const item = await Customer.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: '❌ Kunde nicht gefunden' });
    return res.json(item);
  } catch (err) {
    console.error("❌ Fehler bei getById Kunden:", err);
    return next(err);
  }
};

/**
 * Neuen Kunden anlegen
 * 
 * Erstellt Kunden mit Daten aus dem Body.
 * Antwort: 201 und neuer Kunde.
 */
exports.create = async (req, res, next) => {
  try {
    const item = await Customer.create(req.body);
    return res.status(201).json(item);
  } catch (err) {
    console.error("❌ Fehler bei create Kunden:", err);
    return next(err);
  }
};

/**
 * Kundendaten aktualisieren
 * 
 * Sucht Kunden per ID, aktualisiert dann.
 * Antwort: aktualisiertes Objekt.
 */
exports.update = async (req, res, next) => {
  try {
    const item = await Customer.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: '❌ Kunde nicht gefunden' });
    await item.update(req.body);
    return res.json(item);
  } catch (err) {
    console.error("❌ Fehler bei update Kunden:", err);
    return next(err);
  }
};

/**
 * Kunden löschen
 * 
 * Löscht Kunden per ID, oder 404.
 * Antwort: 204 No Content.
 */
exports.remove = async (req, res, next) => {
  try {
    const item = await Customer.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: '❌ Kunde nicht gefunden' });
    await item.destroy();
    return res.status(204).end();
  } catch (err) {
    console.error("❌ Fehler bei remove Kunden:", err);
    return next(err);
  }
};
