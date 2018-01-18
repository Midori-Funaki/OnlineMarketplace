'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    curentBidPrice: DataTypes.FLOAT,
    currentAskPrice: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER,
    sellerId: DataTypes.INTEGER,
    buyerId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  });

  Product.associate = function (models) {
    Product.hasMany(models.ProductPhoto);
    Product.belongsTo(models.Category);
  }
  return Product;
};