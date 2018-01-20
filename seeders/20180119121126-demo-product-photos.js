'use strict';
const faker = require('faker');
const models = require("./../models");
const ProductPhoto = models.ProductPhoto;

module.exports = {
  up: (queryInterface, Sequelize) => {
    let photos = [];
    for (let i=0; i < 10; i++) {
      for (let j = 1; j <= 4; j++) {
        photos.push({
          url: faker.image.fashion(),
          productId: j
        })
      }
    }
    return ProductPhoto.bulkCreate(photos);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ProductPhotos', null, {});
  }
};
