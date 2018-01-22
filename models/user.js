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
  });

  User.associate = function(models){
    User.belongsToMany(models.Product,{through:models.Cart, foreignKey:'userId'});
    User.hasMany(models.Transaction,{foreignKey:'sellerId',sourceKey:'id'});
    User.hasMany(models.Transaction,{foreignKey:'buyerId',sourceKey:'id'});
    // User.hasMany(models.Product,{foreignKey:'sellerId',sourceKey:'id'});
    // User.hasMany(models.Product,{foreignKey:'buyerId',sourceKey:'id'});
    //User.hasMany(models.FavItem,{foreignKey:'userId',sourceKey:'id'});
  }
  
  return User;
};