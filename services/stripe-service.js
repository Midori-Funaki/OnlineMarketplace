const models = require('./../models');
const User = models.User;


class StripeService {

  constructor() { }

  register(token, user) { //user = { id : 1}
    User.findById(user.id)
    .then(user => {
      user.stripeToken = token
      return user.save();
    })
    .catch(err => {
      console.log(err);
      return err;
    })
  }

  
}

module.exports = StripeService;