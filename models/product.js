'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    size: DataTypes.FLOAT,
    color: DataTypes.STRING,
    condition: DataTypes.STRING,
    curentBidPrice: DataTypes.FLOAT,
    currentAskPrice: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER,
    sellerId: DataTypes.INTEGER,
    buyerId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    brand: DataTypes.STRING
  });

  Product.associate = function (models) {
    Product.hasMany(models.ProductPhoto, {foreignKey: 'productId', sourceKey: 'id'});
    Product.belongsTo(models.Category,{foreignKey:'categoryId',targetKey:'id'});
    Product.hasMany(models.Cart, {foreignKey:'productId', sourceKey: 'id'});
  }
  return Product;
};