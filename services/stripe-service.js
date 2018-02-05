const models = require('./../models');
const User = models.User;
const axios = require('axios');
const stripe = require('stripe')("sk_test_gW7J5GmExE8SZUyO90AedDOY");
const transactionService = require('./transaction-service');

class StripeService {

  constructor() { }

  register(token, user) { //user = { id : 1}
    if (token) {
      return axios.post(
        'https://connect.stripe.com/oauth/token',
        {
          client_secret: "sk_test_gW7J5GmExE8SZUyO90AedDOY",
          code: token,
          grant_type: "authorization_code"
        }
      ).then(res => {
        console.log("stripe: ", res);
        if (res.error) {
          return res.error;
        } else {
          return res.data;
        }
      }).then(data => {
        console.log("stripe user returned: ", data);
        return User.findById(user.id).then(user => {
          user.stripeId = data.user_id;
          user.refresh_token = user.refresh_token;
          console.log("stripe user created:", user.stripeId, user.refresh_token);
          return user.save();
        })
      }).catch(err => {
        return err;
      })
    }
    else {
      return "Token not found";
    }
  }

  charge(totalAmount, paymentToken, orderId, transferObject) {
    // stripe.createCharge()
    if (paymentToken) {
      return stripe.charges.create({
        amount: totalAmount,
        currency: 'hkd',
        source: 'tok_visa',
        transfer_group: orderId,
      })
        .then(charge => {
          // console.log(charge);
          return this.transfer(charge, transferObject
        )});
    }
  }

  transfer(charge, transferObject) {
    let requests = [];
    for (let transfer of transferObject) {
      // console.log(charge.transfer_group);
      requests.push(
        stripe.transfers.create({
          amount: Math.floor(transfer.amount * 100*0.9),
          currency: "hkd",
          destination: transfer.stripeId,
          source_transaction: charge.id,
          transfer_group: charge.transfer_group
        })
      );
    }
    return Promise.all(requests).catch(err => err);
  }
}

module.exports = StripeService;