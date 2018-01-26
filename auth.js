var passport = require('passport');
var passportJWT = require('passport-jwt');
var config = require('./config');
var models = require('./models');
var User = models.User;

const ExtractJwt = passportJWT.ExtractJwt;

module.exports = function(){
    const strategy = new passportJWT.Strategy({
        secretOrKey: config.jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },(payload,done)=>{
        User.findOne({
            where: {
                id: payload.id
            }
        }).then(user=> {
            // console.log("user: " , user.id);
            if (user) {
                return done(null, {id: user.id});
            } else {
                return done(new Error("User not found"), null);
            }
        }).catch(err=> console.log(err));
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