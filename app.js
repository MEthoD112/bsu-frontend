'use strict';

// Import packages
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('diskdb');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const bCrypt = require('bcrypt-nodejs');
const session = require('express-session');
const connect = require('connect');
const SessionStore = require('connect-diskdb')(session);

// connect database files
db.connect('db', ['articles', 'tags', 'users', 'images']);

// Store settings
const options = {
        path: 'db/', // path where the diskDB based file should be stored 
        name: 'sessions', // name of the database
    };

// Create store instance
const diskDBSessionStore = new SessionStore(options);    

// Methods for serching in database
db.users.findByUsername = function(username, cb) {
  process.nextTick(function() {
    for (let i = 0, len = db.users.count(); i < len; i++) {
      let user = db.users.find()[i];
      if (user.username === username) {
        return cb(null, user);
      }
    }
    return cb(null, null);
  });
}

db.users.findById = function(id, cb) {
  process.nextTick(function() {
    let idx = id - 1;
    if (db.users.find()[idx]) {
      cb(null, db.users.find()[idx]);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
  });
}
 
// Define passport stratage for login
passport.use('local', new LocalStrategy({ passReqToCallback : true },
  function(req, username, password, cb) {
    db.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false, req.flash('message','Wrong username')); }
      if (!isValidPassword(user, password)) { return cb(null, false, req.flash('message','Wrong password')); }
      return cb(null, user);
    });
}));

// Function for validate encrypt password
const isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    }

// Define passport stratage for signup
passport.use('signup', new LocalStrategy({ passReqToCallback : true },
    function(req, username, password, done) {
        const findOrCreateUser = function(){
            // find a user in diskDB with provided username
            db.users.findByUsername(username, function(err, user) {
                // In case of any error, return using the done method
                if (err){
                    return done(err);
                }
                // already exists
                if (user) {
                    return done(null, false, req.flash('message','User Already Exists'));
                } else {
                  // if there is no user, create the user
                  const newUser = {};
                  // set the user's local credentials
                  newUser.username = username;
                  newUser.password = createHash(password);
                  newUser.id = db.users.count() + 1;

                  // save the user
                  db.users.save(newUser);
                  return done(null, newUser);
                  
                }
            });
        };
        // Delay the execution of findOrCreateUser and execute the method
        // in the next tick of the event loop
        process.nextTick(findOrCreateUser);
    })
);

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

// Create server
const app = express();

// Settings of session
app.use(session({
        secret: 'keyboard cat',
        resave: true,
        rolling: true,
        expires: false,
        saveUninitialized: false,
        store: diskDBSessionStore 
}));

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

// we need it to parse content-type application/json
app.use(bodyParser.json());


// we need it to parse content-type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require('morgan')('combined'));
app.use(flash());
app.use(require('cookie-parser')());
app.use(passport.initialize());
app.use(passport.session());


const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}

// Function for encrypt password
const createHash = (password) => {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

// request for disable localhost:3000\users
app.get('/user', isAuthenticated, (req, res) => {
    const promise = new Promise((resolve, reject) => {
        resolve(res.render('home', { user: req.user }));
    });
    promise.then(result => result);
});

// Routes for login
app.get('/user', (req, res) => {
    const promiseUser = new Promise((resolve, reject) => {
        resolve(res.render('home', { user: req.user }));
    });
    promiseUser.then(result => result);
});

app.get('/login', (req, res) => {
    const promiseLogin = new Promise((resolve, reject) => {
        resolve(res.render('login', { message: req.flash('message')}));
    });
    promiseLogin.then(result => result);
  });
  
app.post('/login', 
    passport.authenticate('local', { failureRedirect: '/login' }),
    (req, res) => {
        const promise = new Promise((resolve, reject) => {
           resolve(res.redirect('/user'));
        });
        promise.then(result => result);
});

// Route fot logout
app.get('/logout', (req, res) => {
    
    const promise = new Promise((resolve, reject) => {
           req.logout();
           resolve(res.redirect('/'));
        });
        promise.then(result => result);
});

// Registration route
app.post('/register', passport.authenticate('signup', {
    successRedirect: '/user',
    failureRedirect: '/login',
    failureFlash : true  
}));

// get request for getting articles from database for first time load app
app.get('/articles', (req, res) => {
    const promiseArticle = new Promise((resolve, reject) => {
        resolve(db.articles.find());
    });
    promiseArticle.then(result => res.send(result));
});

// get request for getting images from database for first time load app
app.get('/images', (req, res) => {
    const promiseImages = new Promise((resolve, reject) => {
        resolve(db.images.find());
    });
    promiseImages.then(result => res.send(result));
});

// get request for getting tags from database for first time load app
app.get('/tags', (req, res) => {
    const promiseTags = new Promise((resolve, reject) => {
        resolve(db.tags.find());
    });    
    const tags = db.tags.find();
    promiseTags.then(result => res.send(result));
});

// post request for adding article to database
app.post('/articles', (req, res) => {
    const promiseAddArticle = new Promise((resolve, reject) => {
        db.articles.save(req.body);
        resolve(db.articles.find({id: req.body.id}));
    });    
    promiseAddArticle.then(result => res.send(result));
});

// post request for adding tag to database
app.post('/posttags', (req, res) => {
    const promiseAddTag = new Promise((resolve, reject) => {
        db.tags.save(req.body.tag);
        resolve(db.tags.find());
    });    
    promiseAddTag.then(result => res.send(result));
});

// post request for editting article in database
app.put('/editarticle', (req, res) => {
    const promiseEditArticle = new Promise((resolve, reject) => {
        const articleString = req.body;
        const query = { id: articleString.id };

        const options = {
           multi: false,
           upsert: false
        };

        db.articles.update(query, articleString, options);
        resolve(db.articles.find(query));
    });    
    promiseEditArticle.then(result => res.send(result));
});

// post request for deleting article in database
app.delete('/deletearticle', (req, res) => {
    const promiseDeleteArticle = new Promise((resolve, reject) => {
        const id = req.body;
        db.articles.remove(id);
        db.images.remove(id);
        resolve(id);
    });    
    promiseDeleteArticle.then(result => res.send(result));
});

// post for adding image
app.post('/addfoto', (req, res) => {
    const promiseAddImage = new Promise((resolve, reject) => {
        db.images.save(req.body);
        resolve(res.send(req.body));
    });
    promiseAddImage.then(result => result);
});

// post for editing image
app.put('/editfoto', (req, res) => {
    const promiseEditImage = new Promise((resolve, reject) => {
        const articleString = req.body;
        const query = { id: articleString.id };

        const options = {
           multi: false,
           upsert: true
        };

        db.images.update(query, articleString, options);
        const result = db.images.find(query);
        
        resolve(res.send(result));
    });
    promiseEditImage.then(result => result);
});

app.listen(3000, () => { console.log('Port:3000'); });
