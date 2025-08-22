const { User } = require('../models');

/**
 * Alle Benutzer abrufen
 * 
 * Liefert alle Benutzer aus der Datenbank.
 * Antwort: JSON-Array mit Benutzerdaten.
 */
exports.getAll = async (req, res, next) => {
  try {
    const items = await User.findAll();
    return res.json(items);
  } catch (err) {
    console.error("❌ Fehler bei getAll Benutzer:", err);
    return next(err);
  }
};

/**
 * Benutzer anhand ID abrufen
 * 
 * Sucht einen Benutzer per ID.
 * Wenn nicht gefunden, 404.
 */
exports.getById = async (req, res, next) => {
  try {
    const item = await User.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: '❌ Benutzer nicht gefunden' });
    return res.json(item);
  } catch (err) {
    console.error("❌ Fehler bei getById Benutzer:", err);
    return next(err);
  }
};

/**
 * Neuen Benutzer erstellen
 * 
 * Legt neuen Benutzer mit Body-Daten an.
 * Antwort: 201 mit neuem Benutzer.
 */
exports.create = async (req, res, next) => {
  try {
    const item = await User.create(req.body);
    return res.status(201).json(item);
  } catch (err) {
    console.error("❌ Fehler bei create Benutzer:", err);
    return next(err);
  }
};

/**
 * Benutzer aktualisieren
 * 
 * Sucht Benutzer per ID, bei Nichtfinden 404.
 * Update mit Body-Daten.
 * Antwort: aktualisiertes Benutzer-Objekt.
 */
exports.update = async (req, res, next) => {
  try {
    const item = await User.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: '❌ Benutzer nicht gefunden' });
    await item.update(req.body);
    return res.json(item);
  } catch (err) {
    console.error("❌ Fehler bei update Benutzer:", err);
    return next(err);
  }
};

/**
 * Benutzer löschen
 * 
 * Löscht Benutzer per ID, oder 404.
 * Antwort: 204 No Content.
 */
exports.remove = async (req, res, next) => {
  try {
    const item = await User.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: '❌ Benutzer nicht gefunden' });
    await item.destroy();
    return res.status(204).end();
  } catch (err) {
    console.error("❌ Fehler bei remove Benutzer:", err);
    return next(err);
  }
};
