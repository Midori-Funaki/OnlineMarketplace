var gateway = require('./../gateway'),
  braintree = require('braintree'),
  models = require('./../models'),
  Transaction = models.Transaction,
  Product = models.Product;
const Op = require('sequelize').Op;

class transactionService {
  constructor() { }

  get(id) {
    //******** NEED TO CHANGE LINE14 sellerId TO buyerID ********
    return Transaction.findAll({
      where: {
        [Op.or]: [{sellerId: id}, {buyerId: id}]
      },
      include: [{
        model: Product
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