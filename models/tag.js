'use strict';
module.exports = (sequelize, DataTypes) => {
  var Tag = sequelize.define('Tag', {
    keyword: DataTypes.STRING
  });

  Tag.associate = function(models) {
    Tag.belongsTo(models.ProductTag, {foreignKey: 'tagId'});
  }
  return Tag;
};