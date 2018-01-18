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
    
  }

  return Transaction;
};