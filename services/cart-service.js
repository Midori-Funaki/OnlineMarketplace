const models = require('./../models'),
    Cart = models.Cart,
    Product = models.Product;

class CartService {
    constructor() { }

    get(user) {
        return Cart.findAll({
            where: {
                userId: user.id
            },
            include: [{
                model: Product
            }]
        }).then((items) => {
            return items;
        }).catch((err) => {
            return err;
        })
    }

    post(user, productInfo) {
        return Cart.create({
            userId: user,
            productId: productInfo.productId,
            quantity: productInfo.quantity
        }).then((item) => {
            return this.get(user)
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