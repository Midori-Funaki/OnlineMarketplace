'use strict';
const faker = require('faker');
const models = require('./../models');
const Transaction = models.Transaction;

module.exports = {
  
  up: (queryInterface, Sequelize) => {
    
    let transactions = [];
    for(let i=0; i<10; i++){
      transactions.push({
        orderId: (i + 1)% 3,
        status: Math.floor(Math.random() * 5) + 1,
        price: faker.commerce.price(),
        sellerShipAddress: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.country()}`,
        sellerBillAddress: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.country()}`,
        buyerShipAddress: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.country()}`,
        buyerBillAddress: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.country()}`,
        buyerId: Math.floor(Math.random() * 3) + 4,
        sellerId: Math.floor(Math.random() * 3) + 1,
        productId: Math.floor(Math.random() * 10) + 1,
        createdAt: "2016-08-09 07:42:28",
        updatedAt: "2016-08-09 07:42:28"
      })
    }
  
  // return Transaction.bulkCreate(transactions);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Transactions', null, {});
  }
};
