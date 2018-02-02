'use strict';
module.exports = (sequelize, DataTypes) => {
  var ProductTag = sequelize.define('ProductTag', {
    tagId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  });

  ProductTag.associate = function(models) {
    ProductTag.belongsTo(models.Product,{foreignKey: 'productId'});
    ProductTag.hasMany(models.Tag,{foreignKey: 'tagId'});
  }
  return ProductTag;
};