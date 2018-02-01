'use strict';
module.exports = (sequelize, DataTypes) => {
    var ProductPhoto = sequelize.define('ProductPhoto', {
        url: DataTypes.STRING,
        productId: DataTypes.INTEGER
    });

    ProductPhoto.associate = function (models) {
        ProductPhoto.belongsTo(models.Product, {
            foreignKey: 'productId',
            targetKey: 'id'
        })
    }
    return ProductPhoto;
};