'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Carts', [{
        userId: 4,
        productId: 1,
        quantity: 1,
        createdAt: "2016-08-09 07:42:28",
        updatedAt: "2016-08-09 07:42:28"
      },{
        userId: 4,
        productId: 2,
        quantity: 4,
        createdAt: "2016-08-09 07:42:28",
        updatedAt: "2016-08-09 07:42:28"
      },{
        userId: 4,
        productId: 3,
        quantity: 5,
        createdAt: "2016-08-09 07:42:28",
        updatedAt: "2016-08-09 07:42:28"
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Carts', null, {});
  }
};
