'use strict';
const faker = require('faker');
const models = require("./../models");
const Category = models.Category;

module.exports = {
  up: (queryInterface, Sequelize) => {
    let categoryNames = ["Sneakers", "Handbags", "Watches"];
    let categories = [];
    categoryNames.forEach(title => {
      categories.push({
        title: title
      })
    });
    return Category.bulkCreate(categories);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
