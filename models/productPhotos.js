'use strict';
module.exports = (sequelize, DataTypes) => {
    var ProductPhoto = sequelize.define('ProductPhoto', {
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    ProductPhoto.associate = function (models) {
        ProductPhoto.belongsTo(models.Product, { foreignKey: 'productId', targetKey: 'id' });
        ProductPhoto.belongsTo(models.Transaction, { foreignKey: 'productId', targetKey: 'productId' });
        ProductPhoto.belongsTo(models.Cart, { foreignKey: 'productId', targetKey: 'productId' });
    }
    return ProductPhoto;
};