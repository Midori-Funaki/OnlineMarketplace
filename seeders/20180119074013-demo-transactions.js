'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Person', [{
        status: DataTypes.STRING,
        price: DataTypes.FLOAT,
        sellerShipAddress: DataTypes.STRING,
        sellerBillAddress: DataTypes.STRING,
        buyerShipAddress: DataTypes.STRING,
        buyerBillAddress: DataTypes.STRING,
        buyerId: DataTypes.INTEGER,
        sellerId: DataTypes.INTEGER,
        productId: DataTypes.INTEGER
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
