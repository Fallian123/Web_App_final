const { Product } = require('../models');
const updateAllProductsStock = require('../utils/updateAllProductsStock');

/**
 * Alle Produkte abrufen – synchronisiert vorab die Bestände
 * 
 * Dieser Endpunkt liefert eine Liste aller Produkte zurück.
 * Vor dem Abruf werden die Bestände aller Produkte aktualisiert,
 * um die aktuellen Lagerzahlen sicherzustellen.
 * 
 * Antwort: JSON-Array mit Produktobjekten.
 */
exports.getAll = async (req, res, next) => {
  try {
    await updateAllProductsStock();
    const items = await Product.findAll();
    return res.json(items);
  } catch (err) {
    console.error("❌ Fehler bei getAll Produkte:", err);
    return next(err);
  }
};

/**
 * Einzelnes Produkt anhand der ID abrufen – mit Bestandssynchronisation
 * 
 * Liefert ein einzelnes Produkt zurück, wenn vorhanden.
 * Vor der Abfrage wird der Lagerbestand aktualisiert.
 * Falls das Produkt nicht existiert, wird 404 zurückgegeben.
 * 
 * Antwort: JSON-Objekt mit Produktdaten oder Fehler
 */
exports.getById = async (req, res, next) => {
  try {
    await updateAllProductsStock();
    const item = await Product.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: '❌ Produkt nicht gefunden' });
    return res.json(item);
  } catch (err) {
    console.error("❌ Fehler bei getById Produkt:", err);
    return next(err);
  }
};

/**
 * Neues Produkt anlegen
 * 
 * Erwartet Produktdetails im Request-Body.
 * Legt das Produkt in der Datenbank an und liefert das erstellte Objekt zurück.
 * 
 * Antwort: 201 Created mit dem neuen Produkt
 */
exports.create = async (req, res, next) => {
  try {
    const item = await Product.create(req.body);
    return res.status(201).json(item);
  } catch (err) {
    console.error("❌ Fehler bei create Produkt:", err);
    return next(err);
  }
};

/**
 * Produkt aktualisieren
 * 
 * Sucht das Produkt per ID, falls nicht gefunden 404.
 * Aktualisiert die Felder mit Daten aus Request-Body.
 * Antwortet mit dem aktualisierten Produkt.
 */
exports.update = async (req, res, next) => {
  try {
    const item = await Product.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: '❌ Produkt nicht gefunden' });
    await item.update(req.body);
    return res.json(item);
  } catch (err) {
    console.error("❌ Fehler bei update Produkt:", err);
    return next(err);
  }
};

/**
 * Produkt löschen
 * 
 * Sucht das Produkt per ID, falls nicht gefunden 404.
 * Löscht das Produkt, antwortet mit 204 No Content.
 * Bei Foreign-Key-Konflikten (z.B. verknüpfte Bestellungen) wird Fehler 409 zurückgegeben.
 */
exports.remove = async (req, res, next) => {
  try {
    const item = await Product.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: '❌ Produkt nicht gefunden' });
    await item.destroy();
    return res.status(204).end();
  } catch (err) {
    if (err.name === 'SequelizeForeignKeyConstraintError') {
      err.status = 409;
<<<<<<< Updated upstream
      err.message =
        'Produkt kann nicht gelöscht werden, da noch Bestellpositionen darauf verweisen.';
    }
    next(err);
=======
      err.message = 'Produkt kann nicht gelöscht werden, da noch Bestellpositionen darauf verweisen.';
    }
    return next(err);
>>>>>>> Stashed changes
  }
};
