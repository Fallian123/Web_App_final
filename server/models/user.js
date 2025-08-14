const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    created_at: { type: DataTypes.DATE }
  }, {
    tableName: 'users',
    timestamps: false
  });
};
