var express = require('express');
var jwt = require('jwt-simple');
var config = require('../config.js');
var axios = require('axios');

class LoginRoutes{
    constructor(userService){
        this.userService = userService;
    }

    router(){
        let router = express.Router();
        router.post('/',this.local.bind(this));
        router.post('/facebook', this.facebook.bind(this));
        router.post('/google', this.google.bind(this));
        return router;
    }

    local(req,res){
        return this.userService.retrieve(req.body.username)
        .then((user)=>{
            if (user) {
                //check password
                if (user.password === req.body.password){
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
        }).catch((err)=>{
            res.sendStatus(401);
        });
    }

    facebook(req,res){ 
        if (req.body.access_token) {
        var accessToken = req.body.access_token;
        
        return axios.get(`https://graph.facebook.com/me?access_token=${accessToken}&fields=id,email,name`)
            .then((data)=>{
                console.log(data.data);
                if(!data.data.error){
                    var payload = {
                        id: accessToken
                    };
                    var token = jwt.encode(payload, config.jwtSecret);
                    res.json({
                        token: token
                    });
                }else{
                    res.sendStatus(401);
                }
            }).catch((err)=>{
                console.log(err);
                res.sendStatus(401);
            });
        } else {
            res.sendStatus(401);
            return Promise.reject();
        }
        
    }

    google(req,res){
        
        if (req.body.access_token) {
            var accessToken = req.body.access_token;
            
        return axios.get(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`)
            .then((data)=>{
                if(!data.data.error){
                    var payload = {
                        id: accessToken
                    };
                    console.log(data.data);
                    var token = jwt.encode(payload, config.jwtSecret);
                    res.json({
                        token: token
                    });
                }else{
                    res.sendStatus(401);
                }
            }).catch((err)=>{
                console.log(err);
                res.sendStatus(401);
            });
        } else {
            res.sendStatus(401);
            return Promise.reject();
        }
    }
    
}

module.exports = LoginRoutes;