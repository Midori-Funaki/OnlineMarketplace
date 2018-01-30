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
      include: [
        {
          model: Product,
          required: false
        }
      ]
    }).then(category => {
      console.log('Found category: ', category.title)
      return category.Products;
    }).catch(err => {
      console.log(err);
      return err;
    })
  }
  
  getAll() {
    return Category.findAll({})
      .then(categories => {
        return categories;
      }).catch(err => {
        console.log(err);
        return err;
      })
  }

  getBrands(categoryName){
    return Category.findAll({
      where:{
        title: categoryName
      },
      include: [
        {
          model: Product,
          required: false
        }
      ]
    }).then(categories => {
      let brandlist = [];
      categories[0].Products.map(product=>{
        if (product.brand != null && brandlist.indexOf(product.brand) == -1){
          brandlist.push(product.brand);
        }
      })
      return brandlist;      
    }).catch(err => {
      return err;
    })
  }

  getTitles(categoryName,brandName){
    return Category.findAll({
      where:{
        title: categoryName
      },
      include: [
        {
          model: Product,
          required: false,
          where: {
            brand: brandName
          }
        }
      ]
    }).then(result => {
      return result[0].Products.map(item => {
        return item.title;
      })
    }).catch(err => {
      return err;
    })
  }
}

module.exports = CategoryService;