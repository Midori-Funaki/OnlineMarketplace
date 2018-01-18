'use strict';
module.exports = (sequelize, DataTypes) => {
  var Users = sequelize.define('Users', {
    user_id: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    shipping_address: DataTypes.STRING,
    billing_address: DataTypes.STRING
  })
  Users.associate = function(models){
    Users.hasMany(models.CartItems,{foreignKey:'user_id',souceKey:'id'});
    //Users.hasMany(models.Transactions,{foreignKey:'seller_id',sourceKey:'id'});
    //Users.hasMany(models.Transactions,{foreignKey:'buyer_id',sourceKey:'id'});
    Users.hasMany(models.Products,{foreignKey:'seller_id',sourceKey:'id'});
    Users.hasMany(models.Products,{foreignKey:'buyer_id',sourceKey:'id'});
    Users.hasMany(models.FavItems,{foreignKey:'user_id',sourceKey:'id'});
  }
  return Users;
};