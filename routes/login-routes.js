var express = require('express');
var jwt = require('jwt-simple');
var config = require('../config.js');
var axios = require('axios');

class LoginRoutes {
  constructor(userService) {
    this.userService = userService;
  }

  router() {
    let router = express.Router();
    router.post('/', this.local.bind(this));
    router.post('/facebook', this.facebook.bind(this));
    router.post('/google', this.google.bind(this));
    return router;
  }

  local(req, res) {
    return this.userService.auth(req.body.email)
      .then((user) => {
        if (user) {
          //check password
          if (user.password === req.body.password) {
            var payload = {
              id: user.id
            };
            var token = jwt.encode(payload, config.jwtSecret);
            res.json({
              token: token
            });
          } else {
            res.sendStatus(401);
          }
        } else {
          res.sendStatus(401);
        }
      }).catch((err) => {
        res.sendStatus(401);
      });
  }

  facebook(req, res) {
    if (req.body.access_token) {
      var accessToken = req.body.access_token;

      return axios.get(`https://graph.facebook.com/me?access_token=${accessToken}&fields=id,email,name`)
        .then((data) => {
          console.log(data.data);
          if (!data.data.error) {
            //check if that email exist in the database
            this.userService.auth(data.data.email).then((user) => {
                if (user) {
                  console.log(user);
                  var payload = {
                    id: user.id
                  };
                  var token = jwt.encode(payload, config.jwtSecret);
                  res.json({
                    token: token
                  });
                } else {
                  //create new user if not available
                  this.userService.register({
                    userId: data.data.id,
                    firstName: data.data.name,
                    lastName: '',
                    password: '',
                    email: data.data.email,
                    shippingAddress: '',
                    billingAddress: ''
                  }).then((user)=>{
                    var payload = {
                      id: user.dataValues.id
                    };
                    var token = jwt.encode(payload, config.jwtSecret);
                    res.json({
                      token: token
                    });
                  }).catch((err)=>{
                    console.log(err);
                  })
                }
            });
          } else {
            console.log(data.data.error);
            res.sendStatus(401);
          }
        }).catch((err) => {
          console.log(err);
          res.sendStatus(401);
        });
    } else {
      res.sendStatus(401);
      return Promise.reject();
    }

  }

  google(req, res) {

    if (req.body.access_token) {
      var accessToken = req.body.access_token;

      return axios.get(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`)
        .then((data) => {
          if (!data.data.error) {
            var payload = {
              id: accessToken
            };
            console.log(data.data);
            /*
              data.data info used:
                user_id
                email
            */

            // check if the email exist or not
            this.userService.auth(data.data.email).then((user) => {
              if (user) {
                var payload = {
                  id: user.id
                };
                var token = jwt.encode(payload, config.jwtSecret);
                res.json({
                  token: token
                });
              } else {
                //create new user if not available
                this.userService.register({
                  userId: data.data.user_id,
                  firstName: '',
                  lastName: '',
                  password: '',
                  email: data.data.email,
                  shippingAddress: '',
                  billingAddress: ''
                }).then((user)=>{
                  var payload = {
                    id: user.dataValues.id
                  };
                  var token = jwt.encode(payload, config.jwtSecret);
                  res.json({
                    token: token
                  });
                }).catch((err)=>{
                  console.log(err);
                })
              }
            });
          } else {
            res.sendStatus(401);
          }
        }).catch((err) => {
          console.log(err);
          res.sendStatus(401);
        });
    } else {
      res.sendStatus(401);
    }
  }

}

module.exports = LoginRoutes;