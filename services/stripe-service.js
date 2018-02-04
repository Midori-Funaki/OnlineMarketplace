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
        source: paymentToken,
        transfer_group: orderId,
      })
        .then(charge => transfer(charge, transferObject));
    }
  }


  transfer(charge, transferObject) {
    let requests = [];
    for (let transfer of transferObject) {
      requests.push(
        stripe.transfers.create({
          amount: transfer.amount * 0.9,
          currentcy: "hkd",
          destination: transfer.stripeId,
          transfer_group: charge.transfer_group
        })
      );
    }
    return Promise.all(requests).catch(err => err);
  }
}

module.exports = StripeService;