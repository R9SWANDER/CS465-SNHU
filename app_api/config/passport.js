const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Users = require('../models/user');
const User = mongoose.model('users');

passport.use(
    new LocalStrategy(
        {
            usernameField: 'userName',
        },
        async (userName, password, done) => {
            console.log('Passport Login: ', userName, password);
            const q = await User.findOne({ userName }).exec();
            console.log('Passport after search: ', q);
            if (!q) {
                return done(null, false, {
                    message: 'Incorrect username.',
                });
            }
            if (!q.validPassword(password)) {
                return done(null, false, {
                    message: 'Incorrect password.',
                });
            }
            return done(null, q);
        }
    )
);