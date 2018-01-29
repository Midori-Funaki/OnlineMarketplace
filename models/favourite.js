'use strict';
module.exports = (sequelize, DataTypes) => {
  var Favourite = sequelize.define('Favourite', {
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  });

  Favourite.associate = function(models){
    Favourite.belongsTo(models.User,{foreignKey:'userId'});
    Favourite.belongsTo(models.Product,{foreignKey:'productId'});
  }
  return Favourite;
};