const models = require('./../models');
const Product = models.Product;
const ProductPhoto = models.ProductPhoto;
const Category = models.Category;
const ProductTag = models.ProductTag;
const Transaction = models.Transaction;
const User = models.user;
const Op = require('sequelize').Op;
const Tag = models.Tag;
const Sequelize = require('sequelize');

class ProductService {

  constructor() { }

  getAll() {
    return Product.findAll({
      include: [{
        model: ProductPhoto
      },{
        model: Category
      }],
      limit: 20
    })
      .then(products => {
        return products;
      }).catch(err => {
        return err;
      })
  }

  getSell(user){  
    return Product.findAll({
      where: {
        sellerId: user.id
      },
      include: [{
        model: ProductPhoto
      }]
    })
      .then(products => {
        return products
      })
      .catch(err => {
        return err
      })
  }

  getColor(title) {
    return Product.findAll({
      where: {
        title: title
      }
    })
      .then((result) => {
        return result.map((e) => {
          return e.color
        })
      })
      .catch((err) => {
        return err
      })
  }

  get(productId) {
    return Product.findOne({
      where: {
        id: productId
      },
      include: {
        model: ProductPhoto
      },
      attributes: { 
        exclude: ['CategoryId'] 
      },
      include: [{
        model: Category
      },{
        model:ProductPhoto
      }]
    })
      .then((product) => {
        return product;
      }).catch(err => {
        return err;
      })
  }

  search(words){
    let wordArr =  words.query.split(' ');
    // let products = [];
    // for(let i=0; i<wordArr; i++){
    //   Product.findAll({
    //     include: [{
    //       model: Tag,
    //     }],
    //   })
    // }
    let filter = [];
    for (let word of wordArr) {
      filter.push({'keyword': word});
    }
    console.log("filter: ",filter);

    /*
    select pt."productId" as productId, count(pt."tagId") as tagCount
    from "ProductTags" as pt
    inner join "Tags" as t on pt."tagId" = t.Id
    where t.keyword in ('adidas', 'black')
    group by pt."productId"
    order by tagCount desc, productId desc;
    */

    return Product.findAll({

      /*
      attributes:[
        'id'// , Sequelize.fn("COUNT", Sequelize.col("id"),"count")
      ],
      include: [{
        model: Tag,
        attributes: { 
          include: ['id']
        },
        through: {attributes:[]},
        nested: false,
        // required: true,
        where: {
          [Op.or] : filter
        }
      }],
      //group: ['Product.id'],
      raw: true,
      limit: 10
    }).then((result) => {
      let productTags = {};
      result.map((data) => {
        productTags[data.id] = productTags[data.id] + 1 || 1 
      })
      console.log(productTags);
      return result
    }).catch((err) => {
      return err
    */

    include: [{
      model:Tag,
      where: {
        [Op.or] : filter
      }
    }, {
      model: ProductPhoto
    }]
    }).then((result) => {
      return result
    }).catch((err) => {
      return err

    })
  }

  post(productInfo, user) {
    // let category;
    return Category.findOne({
      where: {
        title: productInfo.category
      }
    })
    .then(category => {
      return Product.create({
        title: productInfo.title,
        description: productInfo.description,
        size: productInfo.size,
        color: productInfo.color,
        condition: productInfo.condition,
        // curentBidPrice: productInfo.curentBidPrice,
        currentAskPrice: productInfo.currentAskPrice,
        quantity: productInfo.quantity,
        sellerId: user.id,
        // buyerId: productInfo.INTEGER,
        categoryId: category.id,
        brand: productInfo.brand,
        photos: Array(productInfo.photos.map(photo=> {
          return photo.url;
        }))
      })
    })
    .then(() => {
      console.log('Product posted');
      // console.log('RESULT AFTER PRO REGIS ',result);
      return 'Product posted';
    }).catch(err => {
      console.log(err)
      return err;
    })
  }

  update(productId, productInfo, user) {
    return Product.findOne({
      where:{
        id: productId,
        sellerId: user.id
      }
    }).then((product) => {
      return product.updateAttributes({
        title: productInfo.title,
        description: productInfo.description,
        size: productInfo.size,
        color: productInfo.color,
        condition: productInfo.condition,
        currentAskPrice: productInfo.currentAskPrice,
        quantity: productInfo.quantity,
        // categoryId: category.id, ****HOW TO CHANGE CAT ID
        brand: productInfo.brand
      }).then(() => {
        return ProductPhoto.destroy({
          where:{
            productId: productId
          }
        }).then(() => {
          return productInfo.photos.forEach((data)=>{
            ProductPhoto.create({
              url: data.url,
              productId: productId
            })
          }).then(()=>{
            return 'Update completed'
          })
        })
      })
    }).catch((err) => {
      return err
    })
  }

  delete(productId) {
    return Product.destroy({
      where: { id: productId }
    }).then(() => {
      console.log('Deleted product: ', productId)
    }).catch(err => {
      console.log(err)
    })
  }
}

module.exports = ProductService;