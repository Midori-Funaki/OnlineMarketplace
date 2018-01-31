'use strict';
module.exports = (sequelize, DataTypes) => {
  var Cart = sequelize.define('Cart', {
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  })
  
  Cart.associate = function(models) {
    Cart.belongsTo(models.User,{foreignKey:'userId', targetKey: 'id'});
    Cart.hasMany(models.Product,{foreignKey:'productId', sourceKey: 'id'});
  };
  return Cart;
};