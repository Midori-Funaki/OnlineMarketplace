'use strict';
const models = require("./../models");
const Favourite = models.Favourite;

module.exports = {
  up: (queryInterface, Sequelize) => {
    let favourite = [];
    for(let i=0; i<10; i++){
      favourite.push({
        userId: Math.floor(Math.random() * 2) + 1,
        productId: Math.floor(Math.random() * 30) + 22
      })
    }
    return Favourite.bulkCreate(favourite);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Favourite', null, {});
  }
};
