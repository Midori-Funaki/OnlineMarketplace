const models = require('./../models'),
      Cart = models.Cart,
      Product = models.Product;

const Op = models.Op;

class CartService {
  constructor() { }

  get(user) {
    return Cart.findAll({
      where: {
        userId: user.id
      },
      include: [{
        model: Product
      },{
        model: ProductPhoto
      }]
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
        productId : productInfo.productId
      }
    }).then(cart => {
      if (cart) {
        console.log("cart: ", cart.id);
        cart.quantity += productInfo.quantity;
        cart.save();
        // let quantity = cart.quantity + productInfo.quantity
        // return Cart.update( {
        //   quantity: quantity
        // }, {
        //   where: {
        //     userId: user.id,
        //     productId: productInfo.productId
        //   }
        // }).then(cart => cart);
          //Executing (default): UPDATE "Carts" SET "quantity"=4,"updatedAt"='2018-01-29 07:22:21.030 +00:00' WHERE "productId" = 5
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
      return err
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

  delete(user, productInfo) {
    return Cart.destroy({
      where: {
        userId: user,
        productId: productInfo.productId,
        quantity: productInfo.quantity
      }
    }).then(() => {
      return this.get(user)
    }).catch((err) => {
      return err
    })
  }
}

module.exports = CartService;