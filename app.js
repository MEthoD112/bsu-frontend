'use strict';

// Import packages
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const connect = require('connect');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

// Connect to DB
mongoose.connect('mongodb://localhost/mongodb');
const Articles = require('./mongo/db').articleModel;
const Images = require('./mongo/db').imageModel;
const Tags = require('./mongo/db').tagModel;

// Create server
const app = express();

// Settings of session
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    rolling: true,
    expires: false,
    saveUninitialized: false,
    store: new MongoStore({ url: 'mongodb://localhost/mongodb' }) 
}));

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

// we need to parse content-type application/json
app.use(bodyParser.json({limit: '20mb'}));


// we need it to parse content-type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require('morgan')('combined'));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Initialize Passport
const initPassport = require('./passport/init');
initPassport(passport);

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

// request for disable localhost:3000\users
app.get('/user', isAuthenticated, (req, res) => {
    res.render('home', { user: req.user });
});

// Routes for login
app.get('/user', (req, res) => {
    res.render('home', { user: req.user });
});

//GET login page.
app.get('/login', (req, res) => {
    res.render('login', { message: req.flash('message')});
});
  
app.post('/login', 
    passport.authenticate('local', { failureRedirect: '/login',
                                     successRedirect: '/user', })
);

// Route for logout
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// Registration route
app.post('/register', passport.authenticate('signup', {
    successRedirect: '/user',
    failureRedirect: '/login',
    failureFlash : true  
}));

// get request for getting articles from database for first time load app
app.get('/articles', (req, res) => {
    Articles.find((err, articles) => !err ? res.send(articles) : res.sendStatus(500));
});


// get request for getting images from database for first time load app
app.get('/images', (req, res) => {
    Images.find((err, images) => !err ? res.send(images) : res.sendStatus(500));

});

// get request for getting tags from database for first time load app
app.get('/tags', (req, res) => {
    Tags.find((err, tags) => !err ? res.send(tags) : res.sendStatus(500));
});

// post request for adding article to database
app.post('/articles', (req, res) => {
    const promiseAddArticle = new Promise((resolve, reject) => {
        const article = new Articles(req.body);
        article.save();
        resolve(Articles.find({id: req.body.id}));
    });
    promiseAddArticle.then(result => res.send(result));
});

// post request for adding tag to database
app.post('/posttags', (req, res) => {
    Tags.findOne((err, todo) => {  
        if (err) {
            res.status(500).send(err);
        } else {
            todo.tags += ', ' + req.body.tag;

            // Save the updated document back to the database
            todo.save(function (err, todo) {
                if (err) {
                    res.status(500).send(err)
                }
                res.send(todo);
            });
        }
    });
});

// post request for editting article in database
app.put('/editarticle', (req, res) => {
    const articleString = req.body;
    const query = { id: articleString.id };

    Articles.findOne(query, (err, todo) => {  
        // Handle any possible database errors
        if (err) {
            res.status(500).send(err);
        } else {
            // Update each attribute with any possible attribute that may have been submitted in the body of the request
            // If that attribute isn't in the request body, default back to whatever it was before.
            todo.title = req.body.title || todo.title;
            todo.summary = req.body.summary || todo.summary;
            todo.content = req.body.content || todo.content;
            todo.tags = req.body.tags || todo.tags;

            // Save the updated document back to the database
            todo.save((err, todo) => {
                if (err) {
                    res.status(500).send(err)
                }
                res.send(todo);
            });
        }
    });
});

// post request for deleting article in database
app.delete('/deletearticle', (req, res) => {
    const id = req.body;

    Images.findOneAndRemove(id, (err, todo) => {  
    });
    Articles.findOneAndRemove(id, (err, todo) => {  
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
        const response = {
            message: "Article successfully deleted",
            id: id.id
        };
        res.send(response);
    });

});

// post for adding image
app.post('/addfoto', (req, res) => {
    const promiseAddImage = new Promise((resolve, reject) => {
        const image = new Images(req.body);
        image.save();
        resolve(Images.find({id: req.body.id}));
    });
    promiseAddImage.then(result => res.send(result));
});

// post for editing image
app.put('/editfoto', (req, res) => {
    const articleString = req.body;
    const query = { id: articleString.id };

    Images.findOne(query, (err, todo) => {  
        // Handle any possible database errors
        if (err) {
            res.status(500).send(err);
        } else {
            if (!todo) {
                const image = new Images({id: articleString.id, image : articleString.image});
                image.save((err, todo) => {
                if (err) {
                    res.status(500).send(err)
                }
                res.send(todo);
                });
            } else {
                // Update each attribute with any possible attribute that may have been submitted in the body of the request
                // If that attribute isn't in the request body, default back to whatever it was before.
                todo.image = req.body.image || todo.image;

                // Save the updated document back to the database
                todo.save((err, todo) => {
                    if (err) {
                        res.status(500).send(err)
                    }
                    res.send(todo);
                });
            }    
        }
    });
});

app.listen(3000, () => { console.log('Port:3000'); });
