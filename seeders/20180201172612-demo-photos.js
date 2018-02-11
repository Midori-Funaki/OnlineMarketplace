'use strict';
const data = require('./../productdata');
const models = require("./../models");
const ProductPhoto = models.ProductPhoto;
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let photos = [];
    let id = 1;
    for (let i = 0; i < 5; i++ ){
      photos.push(
        {
          url: data.adidas[i].link,
          productId: id
        },
        {
          url: 'https://picsum.photos/200/300/?random',
          productId: id
        },
        {
          url: 'https://picsum.photos/200/300/?random',
          productId: id
        },
      )
      id++;
    }
    for (let i = 0; i < 5; i++ ){
      photos.push(
        {
          url: data.lvs[i].link,
          productId: id
        },
        {
          url: 'https://picsum.photos/200/300/?random',
          productId: id
        },
        {
          url: 'https://picsum.photos/200/300/?random',
          productId: id
        },
      )
      id++;
    }
    return ProductPhoto.bulkCreate(photos);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ProductPhotos', null, {});
  }
};
