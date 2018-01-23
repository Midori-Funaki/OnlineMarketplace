
import * as express from 'express';
import * as reload from 'reload';
import * as watch from 'watch';
import * as bodyParser from 'body-parser';
import * as jwt from 'jwt-simple';
import axios from 'axios';
import authClass from './auth';
import config from './config';
import users from './users';


const app = express();
const auth = authClass();

app.use(bodyParser.json());
app.use(auth.initialize());

/*app.get('/api/groups',auth.authenticate(),(req,res)=>{
    res.json(groups);
});

app.get('/api/users',auth.authenticate(),(req,res)=>{
    res.json(users);
});*/

app.post("/api/login", function(req, res) {  
    console.log(req.body.username)
    if (req.body.username && req.body.password) {
        var username = req.body.username;
        var password = req.body.password;
        var user = users.find((u)=> {
            return u.name === username && u.password === password;
        });
        if (user) {
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
});

app.post("/api/login/facebook", function(req, res) {  
    if (req.body.access_token) {
        var accessToken = req.body.access_token;
        
        axios.get(`https://graph.facebook.com/me?access_token=${accessToken}&fields=id,email,name`)
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

    }
});

app.post("/api/login/google", function(req, res) {  
    if (req.body.access_token) {
        var accessToken = req.body.access_token;
        
        axios.get(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`)
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

    }
});

// Reloading the backend when backend is changed.
let reloadServer = reload(app);

watch.watchTree(__dirname + "/frontend/dist", function (f, curr, prev) {
    // Fire server-side reload event 
    reloadServer.reload();
});

app.use(express.static('frontend/dist'));

app.use(function(req, res, next) {
    res.sendFile(__dirname + "/frontend/dist/index.html");
})

app.listen(8080);

