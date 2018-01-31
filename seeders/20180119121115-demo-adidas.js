'use strict';
const faker = require('faker');
const models = require("./../models");
const Product = models.Product;
const data = require('./../productdata').adidas;
// const brands = ["Nike","Boss","Rainbow","Meow"];
var conditions = ["new", "used"];

module.exports = {
  up: (queryInterface, Sequelize) => {
    let products = [];
    for (let i = 0; i < data.length; i++) {
      products.push({
        title: data[i].name,
        description: faker.lorem.words(),
        size: Math.floor(Math.random() * 6) + 4,
        color: faker.commerce.color(),
        condition: conditions[Math.floor(Math.random() * 2)],
        curentBidPrice: faker.commerce.price(),
        currentAskPrice: faker.commerce.price(),
        quantity: Math.floor(Math.random() * 10) + 1,
        sellerId: Math.floor(Math.random() * 3) + 1,
        buyerId: Math.floor(Math.random() * 3) + 4,
        categoryId: Math.floor(Math.random() * 3) + 1,
        brand: "adidas",
        photos: {
          default: [data[i].link]
        }
      });
    }
    return Product.bulkCreate(products);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
