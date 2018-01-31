'use strict';
var faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      userId: "id001",
      firstName: "Avia",
      lastName: "Araceli",
      password: "password",
      email: "avia@gmail.com",
      shippingAddress: "70 Bowman St., South Windsor, CT 06074",
      billingAddress: "70 Bowman St., South Windsor, CT 06074",
      createdAt: "2016-08-09 07:42:28",
      updatedAt: "2016-08-09 07:42:28"
    },{
      userId: "id002",
      firstName: "Evandrus",
      lastName: "Radoslav",
      password: "password",
      email: "evandrus@gmail.com",
      shippingAddress: "4 Goldfield Rd., Honolulu, HI 96815",
      billingAddress: "4 Goldfield Rd., Honolulu, HI 96815",
      createdAt: "2016-08-09 07:42:28",
      updatedAt: "2016-08-09 07:42:28"
    },
    {
      userId: "id003",
      firstName: "Gordon",
      lastName: "Lau",
      password: "password",
      email: "gordon@gmail.com",
      shippingAddress: "Flat 3 8/F Lemmi Centre 50 Hoi Yuen Road Kln",
      billingAddress: "Flat 3 8/F Lemmi Centre 50 Hoi Yuen Road Kln",
      createdAt: "2017-08-09 07:42:28",
      updatedAt: "2017-08-09 07:42:28"
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
