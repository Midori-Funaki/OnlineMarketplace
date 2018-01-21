'use strict';
module.exports = (sequelize, DataTypes) => {
  var Cart = sequelize.define('Cart', {
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  })
  
  Cart.associate = function(models) {
    Cart.belongsTo(models.User);
    //Need the relationship with products
  };
  return Cart;
};