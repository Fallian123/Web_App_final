const { Product, OrderItem } = require('../models');
const Sequelize = require('sequelize');

<<<<<<< Updated upstream
const updateAllProductsStock = async () => {
  const products = await Product.findAll({ attributes: ['id', 'stock'] });
=======
/**
* Aktualisiert den Bestand ALLER Produkte basierend auf ihren OrderItems
*/
async function updateAllProductsStock() {
  // Alle Produkte holen
  const products = await Product.findAll();
>>>>>>> Stashed changes

  // Für jedes Produkt den Bestand neu berechnen!
  for (const product of products) {
    // Reservierte Stückzahl berechnen
    const result = await OrderItem.findOne({
      attributes: [
        [Sequelize.fn('COALESCE', Sequelize.fn('SUM', Sequelize.col('quantity')), 0), 'reserved']
      ],
      where: { product_id: product.id }
    });

    // reserviert/available berechnen
    const reserved = parseInt(result?.get('reserved') || 0, 10);
    const available = (product.stock || 0) - reserved;
    await product.update({ reserved, available });
  }
};

module.exports = updateAllProductsStock;
