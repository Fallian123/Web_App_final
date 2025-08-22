const { Product, OrderItem } = require('../models');
const Sequelize = require('sequelize');

<<<<<<< Updated upstream
const updateProductStock = async (productId) => {
  // Bestellte Menge summieren
=======
/**
 * Aktualisiert den Bestand EINES Produkts basierend auf seinen OrderItems
 */
async function updateProductStock(productId) {
>>>>>>> Stashed changes
  const result = await OrderItem.findOne({
    attributes: [
      [Sequelize.fn('COALESCE', Sequelize.fn('SUM', Sequelize.col('quantity')), 0), 'reserved']
    ],
    where: { product_id: productId }
  });

  const reserved = parseInt(result?.get('reserved') || 0, 10);
  const product = await Product.findByPk(productId);

  if (product) {
    const available = (product.stock || 0) - reserved;
    await product.update({ reserved, available });
  }
};

module.exports = updateProductStock;
