const { Product, OrderItem } = require('../models');
const Sequelize = require('sequelize');

async function updateProductStock(productId) {
  // Bestellte Menge summieren
  const result = await OrderItem.findOne({
    attributes: [
      [
        Sequelize.fn(
          'COALESCE',
          Sequelize.fn('SUM', Sequelize.col('quantity')),
          0
        ),
        'reserved'
      ]
    ],
    where: { product_id: productId }
  });

  // Falls keine OrderItems existieren → 0 reserviert
  const reserved = parseInt(result?.get('reserved') || 0, 10);

  // Produkt abrufen und Werte berechnen
  const product = await Product.findByPk(productId);
  if (product) {
    const available = (product.stock || 0) - reserved;

    await product.update({
      reserved,
      available
    });
  }
}

module.exports = updateProductStock;
