const models = require('./../models'),
      Cart = models.Cart;

class CartService{
    constructor(){}

    get(userId){
        return Cart.findAll({
            where:{
                id: userId
            }
        }).then((items)=>{
            return items
        }).catch((err)=>{
            return err
        })
    }

    post(user,productInfo){
        return Cart.create({
            userId: user,
            productId: productInfo.id,
            quantity: productInfo.quantity 
        }).then((item)=>{
            return this.get(user)
        }).catch((err)=>{
            return err
        })
    }

    put(user, productInfo){
        let newData = {
            quantity: productInfo.quantity.new
        }
        return Cart.update(newData,{
            where:{
                userId: user,
                productId: productInfo.id,
                quantity: productInfo.qunatity.old
            }    
        }).then(()=>{
            return this.get(user)
        }).catch((err)=>{
            return err
        })
    }

    delete(user, productInfo){
        return Cart.destroy({
            where:{
                userId: user,
                productId: productInfo.id,
                quantity: productInfo.quantity
            }
        }).then(()=>{
            return 'Deleted the item'
        }).catch((err)=>{
            return err
        })
    }
}

module.exports = CartService;