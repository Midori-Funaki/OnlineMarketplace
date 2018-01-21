const models = require('./../models'),
      Category = models.Category,
      Product = models.Product;

class CategoryService {
  constructor() { }
  
  get(categoryName) {
    return Category.findOne({
      where: {
        title: categoryName
      },
      include: {
        model: Product
      }
    }).then(category => {
      console.log('Found category: ', category.title)
      return category.products;
    }).catch(err => {
      console.log(err);
      return err;
    })
  }
}

module.exports = CategoryService;