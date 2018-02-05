'use strict';
module.exports = (sequelize, DataTypes) => {
  var Cart = sequelize.define('Cart', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  })
  
  Cart.associate = function(models) {
    Cart.belongsTo(models.User,{foreignKey:'userId', targetKey: 'id'});
    Cart.belongsTo(models.Product,{foreignKey:'productId', targetKey: 'id'});
    Cart.hasMany(models.ProductPhoto,{ foreignKey:'productId', sourceKey:'productId'})
  };
  return Cart;
};