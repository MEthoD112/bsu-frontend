const LocalStrategy = require('passport-local').Strategy;
const User = require('../mongo/db').userModel;
const bCrypt = require('bcrypt-nodejs');

module.exports = (passport) => {
    passport.use('signup', new LocalStrategy({
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        (req, username, password, done) => {

            findOrCreateUser = () => {
                // find a user in Mongo with provided username
                User.findOne({ 'username': username }, (err, user) => {
                    // In case of any error, return using the done method
                    if (err) {
                        console.log('Error in SignUp: ' + err);
                        return done(err);
                    }
                    // already exists
                    if (user) {
                        return done(null, false, req.flash('message', 'You Entered Invalid Credentials'));
                    } else {
                        // if there is no user with that email
                        // create the user
                        var newUser = new User();

                        // set the user's local credentials
                        newUser.username = username;
                        newUser.password = createHash(password);

                        // save the user
                        newUser.save((err) => {
                            if (err) {
                                throw err;
                            }
                            return done(null, newUser);
                        });
                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        }));

    // Generates hash using bCrypt
    const createHash = (password) => {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };
};
