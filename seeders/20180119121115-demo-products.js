'use strict';
const faker = require('faker');
const models = require("./../models");
const Product = models.Product;

module.exports = {
  up: (queryInterface, Sequelize) => {
    let products = [];
    for (let i = 0; i < 10; i++) {
      products.push({
        title: faker.commerce.productName(),
        description: faker.lorem.words(),
        size: Math.floor(Math.random() * 6) + 4,
        color: faker.commerce.color(),
        condition: faker.random.words(),
        curentBidPrice: faker.commerce.price(),
        currentAskPrice: faker.commerce.price(),
        quantity: Math.floor(Math.random() * 10) + 1,
        sellerId: Math.floor(Math.random() * 3) + 1,
        buyerId: Math.floor(Math.random() * 3) + 4,
        categoryId: Math.floor(Math.random() * 3) + 1
      });
    }
    return Product.bulkCreate(products);
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Categories', null, {});
  }
};
