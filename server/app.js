const express = require('express');
const dotenv = require('dotenv');
const { sequelize } = require('./models');
const path = require('path');

dotenv.config();

// Route-Module laden
const customerRoutes = require('./routes/customerRoutes');
const orderRoutes = require('./routes/orderRoutes');
const orderItemRoutes = require('./routes/orderItemRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Statische Dateien ausliefern
app.use(express.static(path.join(__dirname, '../client')));

// JSON-Parser aktivieren
app.use(express.json());

// API-Routen
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/order-items', orderItemRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;

// --- Erst DB-Verbindung prüfen, dann sync() und Server starten ---
sequelize.authenticate()
  .then(() => {
    console.log('✅ Verbindung zur Datenbank hergestellt.');
    return sequelize.sync(); // Tabellen nur synchronisieren, wenn Verbindung OK
  })
  .then(() => {
    console.log('✅ Sequelize Sync abgeschlossen.');
    app.listen(PORT, () => console.log(`🚀 Server läuft auf Port ${PORT}`));
  })
  .catch((error) => {
    console.error('❌ Fehler bei DB-Verbindung oder beim Sync:', error.message);
    process.exit(1); // Serverstart abbrechen
  });

module.exports = app;

