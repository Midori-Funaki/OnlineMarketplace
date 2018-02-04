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
      orderId: body.orderId,
      status: body.status,
      price: body.price,
      quantity: body.quantity,
      sellerShipAddress: body.sellerShipAddress,
      sellerShipAddress2: body.sellerBillAddress2,
      sellerBillAddress: body.sellerBillAddress,
      sellerBillAddress2: body.sellerBillAddress2,
      buyerShipAddress: body.buyerShipAddress,
      buyerShipAddress2: body.buyerShipAddress2,
      buyerBillAddress: body.buyerBillAddress,
      buyerBillAddress2: body.buyerBillAddress2,
      buyerId: userId,
      sellerId: body.sellerId,
      productId: body.productId
    })
  }

}

module.exports = transactionService;