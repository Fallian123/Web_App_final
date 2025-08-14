const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.DECIMAL(10, 2) },
    stock: { type: DataTypes.INTEGER },
    reserved: { type: DataTypes.INTEGER, defaultValue: 0 },
    available: { type: DataTypes.INTEGER, defaultValue: 0 },
    created_at: { type: DataTypes.DATE }
  }, {
    tableName: 'products',
    timestamps: false
  });
};