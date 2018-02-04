'use strict';
module.exports = (sequelize, DataTypes) => {
  var Transaction = sequelize.define('Transaction', {
    orderId: {
      type: DataTypes.STRING,
      allowNull: false
    },
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
    Transaction.hasMany(models.ProductPhoto, { foreignKey: 'productId', sourceKey: 'productId' });
  }
  return Transaction;
};