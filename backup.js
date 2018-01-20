'use strict';
const faker = require('faker');
const models = require("./../models");
const Category = models.Category;
const Product = models.Product;
const ProductPhoto = models.ProductPhoto;

module.exports = {
  up: (queryInterface, Sequelize) => {

    function genCate(namesArray) {
      let promises = [];
      for (let name of namesArray) {
        promises.push(Category.create({
          title: name
        }));
      }
      return Promise.all(promises);
    }

    function genProduct(number) {
      let promises = [];
      for (let i = 0; i < number; i++) {
        promises.push(Product.create({
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
        }));
      }
      //Product.bulkCreate()
      console.log("promises.length:", promises.length);
      return Promise.all(promises);
    }

    function genPhotos(product) {
      let arr = [];
      for (let i = 0; i < 3; i++) {
        // ProductPhoto.create({
        //   url: faker.image.fashion(),
        //   productId: product.id
        // })

        arr.push({
          url: faker.image.fashion(),
          productId: product.id
        })
      }
      console.log("arr", arr);
      return arr
    }

    return genProduct(10).then(products => {
      let photos = [];
      products.forEach(product => {
          //console.log(product);
          photos = photos.concat(genPhotos(product));
          
      });
      // photos.forEach(photo => {
      //   ProductPhoto.create(photo);
      // });
      console.log(photos.length);
      return ProductPhoto.bulkCreate(photos);
      // console.log("result", result);
    })
    .catch(err => console.log(err));
    // return genCate(["Sneakers", "Handbags", "Watches"])
    //   .then((cat)=> {
    //     //console.log("cat", cat);
    //     genProduct(10)
    //       .then(products => {
    //         console.log("products", products);
    //         products.forEach(product => {
    //           genPhotos(product); 
    //         })
    //       }).catch((err) => console.log("product err", err));
    //   })
    

  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([Category.truncate(),Product.truncate(), ProductPhoto.truncate()]);
  }
};
