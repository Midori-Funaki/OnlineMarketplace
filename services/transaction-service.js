var gateway = require('./../gateway'),
  braintree = require('braintree'),
  models = require('./../models'),
  Transaction = models.Transaction,
  Product = models.Product;
  ProductPhoto = models.ProductPhoto;

class transactionService {
  constructor() { }

  get(user) {
    //******** NEED TO CHANGE LINE14 sellerId TO buyerID ********
    return Transaction.findAll({
      where: {
        sellerId: user.id
      },
      include: [{
        model: Product
      },{
        model: ProductPhoto
      }]
    }).then((transactions) => {
      return transactions;
    }).catch((err) => {
      return err;
    })
  }

  post(userid, body) {
    return Transaction.create({
      
    })
  }

}

module.exports = transactionService;