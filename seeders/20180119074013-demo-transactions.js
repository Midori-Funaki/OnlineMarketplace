'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Transactions', [{
      status: 1,
      price: 650,
      sellerShipAddress: "70 Bowman St., South Windsor, CT 06074",
      sellerBillAddress: "70 Bowman St., South Windsor, CT 06074",
      buyerShipAddress: "4 Goldfield Rd., Honolulu, HI 96815",
      buyerBillAddress: "4 Goldfield Rd., Honolulu, HI 96815",
      buyerId: 15,
      sellerId: 14,
      productId: 7,
      createdAt: "2016-08-09 07:42:28",
      updatedAt: "2016-08-09 07:42:28"
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Transactions', null, {});
  }
};
