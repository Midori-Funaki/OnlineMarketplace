var models = require('./../models'),
  Transaction = models.Transaction,
  Product = models.Product,
  ProductPhoto = models.ProductPhoto;
User = models.User;
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
      }, {
        model: ProductPhoto
      }, {
        model: User
      },
    ],
    order:[['createdAt','DESC']]
    }).then((transactions) => {
      return transactions;
    }).catch((err) => {
      return err;
    })
  }

  post(userid, body) {
    // console.log("posting...");
    return Transaction.create({
      orderId: body.orderId,
      status: body.status,
      price: body.price,
      quantity: body.quantity,
      buyerShipAddress: body.buyerShipAddress,
      buyerShipAddress2: body.buyerShipAddress2,
      buyerFirstName: body.buyerFirstName,
      buyerLastName: body.buyerLastName,
      buyerContact: body.buyerContact,
      buyerBillAddress: body.buyerBillAddress,
      buyerBillAddress2: body.buyerBillAddress2,
      buyerId: userid,
      sellerId: body.sellerId,
      productId: body.productId,
      chargeId: body.chargeId,
    })
      .then(transaction => {
        // console.log("post done", transaction);
        return Product.findById(transaction.productId)
          .then(product => {
            // console.log("Product Found", product)
            product.quantity -= transaction.quantity;
            return product.save();
          })
      })
      .then(_ => "transaction done", err => err)
  }

  updateStatus(id, body) {
    return Transaction.findById(id)
      .then(transaction => {
        transaction.status = body.status
        return transaction.save();
      })
      .then(res => res, err => err)
  }
}

module.exports = transactionService;