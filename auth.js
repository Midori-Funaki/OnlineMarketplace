var passport = require('passport');
var passportJWT = require('passport-jwt');
var config = require('./config');
var users = require ('./users');

const ExtractJwt = passportJWT.ExtractJwt;

module.exports = function(){
    const strategy = new passportJWT.Strategy({
        secretOrKey: config.jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },(payload,done)=>{
        const user = users.find((user)=>{
            return user.id == payload.id
        });
        if (user) {
            return done(null, {id: user.id});
        } else {
            return done(new Error("User not found"), null);
        }
    });
    passport.use(strategy);

    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", config.jwtSession);
        }
    };
}