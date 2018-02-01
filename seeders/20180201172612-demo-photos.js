'use strict';
const data = require('./../productdata');
const models = require("./../models");
const ProductPhoto = models.ProductPhoto;

module.exports = {
  up: (queryInterface, Sequelize) => {
    let photos = [];
    let id = 1;
    for (let i = 0; i < data.adidas.length; i++ ){
      photos.push(
        {
          url: data.adidas[i].link,
          productId: id
        }
      )
      id++;
    }
    for (let i = 0; i < data.lvs.length; i++ ){
      photos.push(
        {
          url: data.adidas[i].link,
          productId: id
        }
      )
      id++;
    }
    return ProductPhoto.bulkCreate(photos);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ProductPhotos', null, {});
  }
};
