const models = require('./../models');
const Product = models.Product;
const ProductPhoto = models.ProductPhoto;
const Category = models.Category;
const Transaction = models.Transaction;
const Favourite = models.Favourite;

class FavService {

    constructor() { }

    getAll(userId) {
        return Favourite.findAll({
            include: [{
                model: Product, include: [{
                    model: ProductPhoto
                }]
            }],
            where: {
                userId: userId
            }         
        })
        .then(products => {
            return products;
        }).catch(err => {
            return err;
        })
    }

    getID(userId, productId){
        return Favourite.findOne({
            where:{
                userId: userId,
                productId: productId
            }
        }).then(favourite => {
            return favourite;
        }).catch(err => {
            return err;
        })
    }

    addFav(userId, productId) {
        return Favourite.create({
            userId: userId,
            productId: productId
        }).then(()=>{
            return ;
        }).catch((err)=>{
            console.log(err);
            return err;
        })
    }

    removeFav(favouriteId, userId) {
        return Favourite.destroy({
            where: {
                id: favouriteId
            }
        }).then(()=>{
            return this.getAll(userId);
        }).catch(()=>{
            console.log(err);
            return err;
        })
    }
}

module.exports = FavService;