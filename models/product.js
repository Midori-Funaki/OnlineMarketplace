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
    categoryId: DataTypes.INTEGER
  });

  Product.associate = function (models) {
    Product.hasMany(models.ProductPhoto, {foreignKey: 'productId', targetKey: 'id'});
    Product.belongsTo(models.Category,{foreignKey:'categoryId',targetKey:'id'});
    Product.belongsToMany(models.User,{through:models.Cart, foreignKey:'productId'});
  }
  return Product;
};