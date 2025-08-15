const { Product, OrderItem } = require('../models');
const Sequelize = require('sequelize');

const updateAllProductsStock = async () => {
  const products = await Product.findAll({ attributes: ['id', 'stock'] });

  for (const product of products) {
    const result = await OrderItem.findOne({
      attributes: [
        [Sequelize.fn('COALESCE', Sequelize.fn('SUM', Sequelize.col('quantity')), 0), 'reserved']
      ],
      where: { product_id: product.id }
    });

    const reserved = parseInt(result?.get('reserved') || 0, 10);
    const available = (product.stock || 0) - reserved;

    await product.update({ reserved, available });
  }
};

module.exports = updateAllProductsStock;
