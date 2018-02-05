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
        [Op.or]: [{ sellerId: id }, { buyerId: id }]
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
    console.log("posting...");
    return Transaction.create({
      orderId: body.orderId,
      status: body.status,
      price: body.price,
      quantity: body.quantity,
      buyerShipAddress: body.buyerShipAddress,
      buyerShipAddress2: body.buyerShipAddress2,
      contact: body.contact,
      buyerBillAddress: body.buyerBillAddress,
      buyerBillAddress2: body.buyerBillAddress2,
      buyerId: userid,
      sellerId: body.sellerId,
      productId: body.productId
    })
      .then(transaction => {
        console.log("post done", transaction);
        return Product.findById(transaction.productId)
          .then(product => {
            console.log("Product Found", product)
            product.quantity -= transaction.quantity;
            if (product.quantity <= 0) {
              return product.destroy();
            } else {
              return product.save();
            }
          })
      })
      .then(_ => {
        return "Transaction created"
      })
      .catch(err => {
        return err;
      });
  }
}

module.exports = transactionService;