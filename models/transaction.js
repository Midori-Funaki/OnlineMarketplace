'use strict';
module.exports = (sequelize, DataTypes) => {
  var Transaction = sequelize.define('Transaction', {
    status: DataTypes.STRING,
    price: DataTypes.FLOAT,
    sellerShipAddress: DataTypes.STRING,
    sellerBillAddress: DataTypes.STRING,
    buyerShipAddress: DataTypes.STRING,
    buyerBillAddress: DataTypes.STRING,
    buyerId: DataTypes.INTEGER,
    sellerId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  });

  Transaction.associate = function (models) {
    Transaction.belongsTo(models.User, { foreignKey: 'buyerId', targetKey: 'id' });
    Transaction.belongsTo(models.User, { foreignKey: 'sellerId', targetKey: 'id' });
    Transaction.belongsTo(models.Product, { foreignKey: 'productId', targetKey: 'id' });
  }
  return Transaction;
};