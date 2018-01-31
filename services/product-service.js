const models = require('./../models');
const Product = models.Product;
const ProductPhoto = models.ProductPhoto;
const Category = models.Category;

class ProductService {

  constructor() { }

  getAll() {
    return Product.findAll({
      attributes: { exclude: ['CategoryId'] }
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
      attributes: { 
        exclude: ['CategoryId'] 
      }
    })
      .then((product) => {
        return product;
      }).catch(err => {
        return err;
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
        // size: productInfo.size,
        color: productInfo.color,
        condition: productInfo.condition,
        // curentBidPrice: productInfo.curentBidPrice,
        currentAskPrice: productInfo.currentAskPrice,
        quantity: productInfo.quantity,
        sellerId: user.id,
        // buyerId: productInfo.INTEGER,
        categoryId: category.id,
        brand: productInfo.brand
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
      console.log('Product posted');
      return 'Product posted';
    }).catch(err => {
      console.log(err)
      return err;
    })
  }

  update(productId, req) {
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