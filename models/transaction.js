'use strict';
module.exports = (sequelize, DataTypes) => {
  var Transaction = sequelize.define('Transaction', {
    orderId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sellerShipAddress: {
      type: DataTypes.STRING
    },
    sellerShipAddress2: {
      type: DataTypes.STRING
    },
    sellerBillAddress: {
      type: DataTypes.STRING
    },
    sellerBillAddress2: {
      type: DataTypes.STRING
    },
    buyerFirstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    buyerLastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    buyerContact: {
      type: DataTypes.STRING,
      allowNull: false
    },
    buyerShipAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    buyerShipAddress2: {
      type: DataTypes.STRING
    },
    buyerBillAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    buyerBillAddress2: {
      type: DataTypes.STRING
    },
    buyerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sellerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    chargeId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    transferId: {
      type: DataTypes.STRING
    }
  });

  Transaction.associate = function (models) {
    // Transaction.belongsTo(models.User, { foreignKey: 'buyerId', targetKey: 'id' });
    Transaction.belongsTo(models.User, { foreignKey: 'sellerId', targetKey: 'id' });
    Transaction.belongsTo(models.Product, { foreignKey: 'productId', targetKey: 'id' });
    Transaction.hasMany(models.ProductPhoto, { foreignKey: 'productId', sourceKey: 'productId' });
  }
  return Transaction;
};