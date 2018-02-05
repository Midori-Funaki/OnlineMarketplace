'use strict';
module.exports = (sequelize, DataTypes) => {
  var Cart = sequelize.define('Cart', {
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  })
  
  Cart.associate = function(models) {
    Cart.belongsTo(models.User,{foreignKey:'userId', targetKey: 'id'});
    Cart.belongsTo(models.Product,{foreignKey:'productId', targetKey: 'id'});
    Cart.hasMany(models.ProductPhoto,{ foreignKey:'productId', sourceKey:'productId'})
  };
  return Cart;
};