/**
 * Zentrale Fehlerbehandlung für Express
 * - Gibt konsistente JSON-Fehlerstruktur zurück
 */
module.exports = (err, req, res, next) => {
  console.error("❌ Globaler Fehler:", err);
  return res.status(err.status || 500).json({
    message: err.message || 'Unbekannter Serverfehler'
  });
};
