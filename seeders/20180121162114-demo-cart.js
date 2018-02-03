'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      // return queryInterface.bulkInsert('Carts', [{
      //   userId: 1,
      //   productId: 1,
      //   quantity: 3,
      //   createdAt: "2016-08-09 07:42:28",
      //   updatedAt: "2016-08-09 07:42:28"
      // },{
      //   userId: 1,
      //   productId: 2,
      //   quantity: 1,
      //   createdAt: "2016-08-09 07:42:28",
      //   updatedAt: "2016-08-09 07:42:28"
      // },{
      //   userId: 2,
      //   productId: 1,
      //   quantity: 9,
      //   createdAt: "2016-08-09 07:42:28",
      //   updatedAt: "2016-08-09 07:42:28"
      // }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Carts', null, {});
  }
};
