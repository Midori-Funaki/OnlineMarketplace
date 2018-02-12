'use strict';
var faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      userId: "id005",
      firstName: "Avia",
      lastName: "Araceli",
      password: "password",
      email: "avia@gmail.com",
      shippingAddress: "70 Bowman St., South Windsor, CT 06074",
      billingAddress: "70 Bowman St., South Windsor, CT 06074",
      stripeId: "acct_1BpoeSCNO1ltiIm0",
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
      stripeId: "acct_1BriZ0GlZsfFWyIl",
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
      stripeId: "acct_1BriXoHXO1lVjv9r",
      createdAt: "2017-08-09 07:42:28",
      updatedAt: "2017-08-09 07:42:28",
    },
    {
      userId: "id004",
      firstName: "Customer",
      lastName: "Gold",
      password: "password",
      email: "customer@gmail.com",
      shippingAddress: "16/F, Nakedhub, Sheung Wan, Hong Kong",
      billingAddress: "16/F, Nakedhub, Sheung Wan, Hong Kong",
      createdAt: "2017-09-09 07:42:28",
      updatedAt: "2017-09-09 07:42:28",
    },
    {
      userId: "id007",
      firstName: "lvbeck",
      lastName: "Silver",
      password: "password",
      email: "ivbeck@gmail.com",
      shippingAddress: "31/F, WanChai, OneTower, Hong Kong",
      billingAddress: "31/F, WanChai, OneTower, Hong Kong",
      createdAt: "2017-09-09 07:42:28",
      updatedAt: "2017-09-09 07:42:28",
    },
    {
      userId: "id008",
      firstName: "Vim",
      lastName: "Bell",
      password: "password",
      email: "vim@gmail.com",
      shippingAddress: "2/F, River, WaterTower, Hawaii",
      billingAddress: "2/F, River, WaterTower, Hawaii",
      createdAt: "2017-09-09 07:42:28",
      updatedAt: "2017-09-09 07:42:28",
    },
    {
      userId: "id009",
      firstName: "Philips",
      lastName: "Leo",
      password: "password",
      email: "philips@gmail.com",
      shippingAddress: "8/F, Sun, SunTower, Hawaii",
      billingAddress: "8/F, Sun, SunTower, Hawaii",
      createdAt: "2017-09-09 07:42:28",
      updatedAt: "2017-09-09 07:42:28",
    },
    {
      userId: "id010",
      firstName: "Delo",
      lastName: "Flower",
      password: "password",
      email: "delo@gmail.com",
      shippingAddress: "13/F, Cosmo, CosmoTower, Waikiki",
      billingAddress: "13/F, Cosmo, CosmoTower, Waikiki",
      createdAt: "2017-09-09 07:42:28",
      updatedAt: "2017-09-09 07:42:28",
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
