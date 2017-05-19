const express = require('express');
const flash = require('connect-flash');
const passport = require('passport');
const session = require('express-session');
const connect = require('connect');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

const router = express.Router();

// Connect to DB
mongoose.connect('mongodb://localhost/mongodb');

// Settings of session
router.use(session({
    secret: 'keyboard cat',
    resave: true,
    rolling: true,
    expires: false,
    saveUninitialized: false,
    store: new MongoStore({ url: 'mongodb://localhost/mongodb' })
}));

router.use(flash());
router.use(passport.initialize());
router.use(passport.session());

// Initialize Passport
const initPassport = require('../passport/init');
initPassport(passport);

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
};

// request for disable localhost:3000\users
router.get('/user', isAuthenticated, (req, res) => {
    res.render('home', { user: req.user });
});

// Routes for login
router.get('/user', (req, res) => {
    res.render('home', { user: req.user });
});

// GET login page.
router.get('/login', (req, res) => {
    res.render('login', { message: req.flash('message') });
});

router.post('/login',
    passport.authenticate('local', { failureRedirect: '/login',
                                     successRedirect: '/user', })
);

// Route for logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// Signup route
router.post('/register', passport.authenticate('signup', {
    successRedirect: '/user',
    failureRedirect: '/login',
    failureFlash : true
}));

module.exports = router;
