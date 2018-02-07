'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    shippingAddress: DataTypes.STRING,
    shippingAddress2: DataTypes.STRING,
    billingAddress: DataTypes.STRING,
    billingAddress2: DataTypes.STRING,
    contact: DataTypes.STRING,
    stripeId: DataTypes.STRING,
    refresh_token: DataTypes.STRING
  });

  User.associate = function(models){
    User.hasMany(models.Cart,{foreignKey:'userId', sourceKey: 'id'});
    User.hasMany(models.Transaction,{foreignKey:'buyerId',sourceKey:'id'});
    User.hasMany(models.Product,{foreignKey:'sellerId',sourceKey:'id'});
    User.hasMany(models.Favourite,{foreignKey:'userId',sourceKey:'id'});
  }
  
  return User;
};