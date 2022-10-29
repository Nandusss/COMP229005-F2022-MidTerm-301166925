/* *
 * local.js
 * Nandagopan Dilip
 * 301166925
 * 29/10/2022
 */

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// validating password and username
module.exports = function() {
    passport.use(new LocalStrategy((username, password, done)=>{
        User.findOne({username: username}, (err, user)=>{
            if (err) {
                return done(err);
            }
            
            if (!user) {
                return done(null, false, {
                    message: 'Unknown user'
                });
            }
    
            if (!user.authenticate(password)) {
                return done(null, false, {
                    message: 'Invalid password'
                });
            }
            
            return done(null, user);
        });
    }));
};