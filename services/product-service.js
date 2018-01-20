const models = require('./../models');
const Product = models.Product;
const Category = models.Category;
const ProductPhoto = models.ProductPhoto;

class ProductService {

  constructor() { }

  getAll() {
    return Products.findAll()
      .then(products => {
        console.log('Products found: ', products);
        return products;
      }).catch(err => {
        console.log(err);
      })
  }

  get(productId) {
    return Products.findOne({
      where: {
        id: productId
      }
    })
      .then(product => {
        console.log('Product found: ', product);
        return product;
      }).catch(err => {
        console.log(err);
      })
  }

  post(productInfo, user) {
    let category;
    Category.findOne({
      where: {
        title: productInfo.categoryName
      }
    }).then(category => {
      return Product.create({
        title: productInfo.title,
        description: productInfo.description,
        size: productInfo.size,
        color: productInfo.color,
        condition: productInfo.condition,
        curentBidPrice: productInfo.curentBidPrice,
        currentAskPrice: productInfo.currentAskPrice,
        quantity: productInfo.quantity,
        sellerId: user.id,
        // buyerId: productInfo.INTEGER,
        categoryId: category.id
      })
    })
    .then(product => {
      for (let photo of productInfo.photos) {
        ProductPhoto.create({
          url: photo.url,
          productId: product.id
        })
      }
    })
    .then(() => {
      console.log('Product posted')
    }).catch(err => {
      console.log(err)
    })
  }

  update(product, req) {
    let attr = req.attr;
    let updates = req.updates;
    let newData = {
      [attr]: updates
    };
    return Product.update(newData, { where: { id: productId } })
      .then(result => {
        return result;
      })
      .catch(err => {
        return err;
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