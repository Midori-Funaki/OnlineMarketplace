const models = require('./../models');
const User = models.User;
const Product = models.Product;

class UserProductService {
  constructor(){}

  get(userId) {
    return User.findOne({
      where: {
        id: userId
      },
      include: {
        model: Product
      }
    }).then(user => {
      return user.products;
    })
  }
}

module.exports = UserProductService;