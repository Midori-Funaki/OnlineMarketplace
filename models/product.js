'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    brand: DataTypes.STRING,
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
    Product.belongsTo(models.Category,{foreignKey:'categoryId',targetKey:'id'});
    Product.hasMany(models.Cart, {foreignKey:'productId', sourceKey: 'id'});
    Product.hasMany(models.ProductPhoto, {foreignKey: 'productId', sourceKey: 'id'})
  }
  return Product;
};