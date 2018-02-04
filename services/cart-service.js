const models = require('./../models'),
  Cart = models.Cart,
  Product = models.Product;
const User = models.User;
const ProductPhoto = models.ProductPhoto

class CartService {
  constructor() { }

  get(user) {
    return Cart.findAll({
      where: {
        userId: user.id
      },
      include: [
        {
          model: Product,
          include: [{
            model: User
          }, {
            model: ProductPhoto
          }]
        }
      ]
    }).then((cart) => {
      return cart;
    }).catch((err) => {
      return err;
    })
  }

  post(user, productInfo) {
    // console.log("add to cart", user, productInfo);
    return Cart.findOne({
      where: {
        userId: user.id,
        productId: productInfo.productId
      }
    }).then(cart => {
      if (cart) {
        console.log("cart: ", cart.id);
        cart.quantity += productInfo.quantity;
        cart.save();
        return cart;
      }
      else {
        return Cart.create({
          userId: user.id,
          productId: productInfo.productId,
          quantity: productInfo.quantity
        }).then(cart => {
          return cart;
        })
      }
    }).catch((err) => {
      return err;
    })
  }

  put(user, productInfo) {
    let newData = {
      quantity: productInfo.quantity[0].new
    }
    return Cart.update(newData, {
      where: {
        userId: user,
        productId: productInfo.productId,
        quantity: productInfo.quantity[0].old
      }
    }).then(() => {
      return this.get(user)
    }).catch((err) => {
      return err
    })
  }

  delete(userId, productId) {
    return Cart.destroy({
      where: {
        userId: userId,
        productId: productId,
      }
    }).then(() => {
      return this.get(user);
    }).catch((err) => {
      return err;
    })
  }

  empty(userId) {
    return Cart.destroy({
      where: {
        userId: userId
      }
    }).then(() => {
      return this.get(user)
    }).catch(err => {
      return err;
    })
  }
}

module.exports = CartService;