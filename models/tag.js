'use strict';
module.exports = (sequelize, DataTypes) => {
  var Tag = sequelize.define('Tag', {
    keyword: DataTypes.STRING
  });

  Tag.associate = function(models) {
    Tag.belongsToMany(models.Product ,{through: 'ProductTag', foreignKey: 'tagId'});
  }
  return Tag;
};