'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      user_id: "id001",
      first_name: "Avia",
      last_name: "Araceli",
      password: "password",
      email: "avia@gmail.com",
      shipping_address: "70 Bowman St., South Windsor, CT 06074",
      billing_address: "70 Bowman St., South Windsor, CT 06074",
      createdAt: "2016-08-09 07:42:28",
      updatedAt: "2016-08-09 07:42:28"
    },{
      user_id: "id002",
      first_name: "Evandrus",
      last_name: "Radoslav",
      password: "password",
      email: "evandrus@gmail.com",
      shipping_address: "4 Goldfield Rd., Honolulu, HI 96815",
      billing_address: "4 Goldfield Rd., Honolulu, HI 96815",
      createdAt: "2016-08-09 07:42:28",
      updatedAt: "2016-08-09 07:42:28"
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
