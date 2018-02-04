'use strict';
module.exports = (sequelize, DataTypes) => {
    var ProductPhoto = sequelize.define('ProductPhoto', {
        url: DataTypes.STRING,
        productId: DataTypes.INTEGER
    });

    ProductPhoto.associate = function (models) {
        ProductPhoto.belongsTo(models.Product, {foreignKey: 'productId',targetKey: 'id'});
        ProductPhoto.belongsTo(models.Transaction, { foreignKey: 'productId', targetKey: 'productId'});
    }
    return ProductPhoto;
};