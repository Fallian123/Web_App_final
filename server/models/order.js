const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    customer_id: { type: DataTypes.INTEGER, allowNull: false },
    order_date: { type: DataTypes.DATE },
    status: { type: DataTypes.STRING }
  }, {
    tableName: 'orders',
    timestamps: false
  });
};