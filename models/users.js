'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    userId: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    shippingAddress: DataTypes.STRING,
    billingAddress: DataTypes.STRING
  })
  Users.associate = function(models){
    Users.hasMany(models.CartItem,{foreignKey:'userId',souceKey:'id'});
    //Users.hasMany(models.Transactions,{foreignKey:'seller_id',sourceKey:'id'});
    //Users.hasMany(models.Transactions,{foreignKey:'buyer_id',sourceKey:'id'});
    Users.hasMany(models.Product,{foreignKey:'sellerId',sourceKey:'id'});
    Users.hasMany(models.Product,{foreignKey:'buyerId',sourceKey:'id'});
    Users.hasMany(models.FavItem,{foreignKey:'userId',sourceKey:'id'});
  }
  return User;
};