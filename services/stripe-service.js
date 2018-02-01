const models = require('./../models');
const User = models.User;
const axios = require('axios');

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
        console.log(res);
        if (res.error) {
          return res.error;
        } else {
          return res.data.stripe_user_id;
        }
      }).then(user_id => {
        console.log(user_id); 
        return User.findById(user.id).then(user => {
          user.stripeId = user_id;
          return user.save();
        })
      }).catch(err => {
        return err;
      })
    }
  }
}

module.exports = StripeService;