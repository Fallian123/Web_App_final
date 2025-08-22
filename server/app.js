const express = require('express');
const dotenv = require('dotenv');
const { sequelize } = require('./models');
const path = require('path');

// Error Handler einbinden
const errorHandler = require('./middleware/errorHandler');

dotenv.config();
const app = express();

// Statische Dateien (Client) bereitstellen
app.use(express.static(path.join(__dirname, '../client')));

// JSON Body Parser aktivieren
app.use(express.json());

// API-Routen laden
app.use('/api/customers', require('./routes/customerRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/order-items', require('./routes/orderItemRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Globales Error-Handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// --- Verbindung testen & Server starten ---
sequelize.authenticate()
  .then(() => {
    console.log('✅ Verbindung zur Datenbank hergestellt.');
    return sequelize.sync();
  })
  .then(() => {
    console.log('✅ Sequelize Sync abgeschlossen.');
    app.listen(PORT, () => console.log(`🚀 Server läuft auf Port ${PORT}`));
  })
  .catch((error) => {
    console.error('❌ Fehler bei DB-Verbindung oder Sync:', error.message);
    process.exit(1);
  });

module.exports = app;
