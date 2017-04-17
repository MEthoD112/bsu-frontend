'use strict';

const express = require('express');

const db = require('diskdb');

const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public'));

// we need it to parse content-type application/json
app.use(bodyParser.json());

// we need it to parse content-type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// connect database files
db.connect('db', ['articles', 'tags']);

// get request for getting articles from database for first time load app
app.get('/articles', (req, res) => {
    const articles = db.articles.find();
    res.send(articles);
});

// get request for getting tags from database for first time load app
app.get('/tags', (req, res) => {
    const tags = db.tags.find();
    res.send(tags);
});

// post request for adding article to database
app.post('/articles', (req, res) => {
    const articlesString = req.body;
    db.articles.save(articlesString);

    const article = db.articles.find({id: articlesString.id});
    res.send(article);
});

// post request for adding tag to database
app.post('/posttags', (req, res) => {
    const tagString = req.body.tag;
    db.tags.save(tagString);
    const tags = db.tags.find();
    res.send(tags);
});

// post request for editting article in database
app.post('/editarticle', (req, res) => {
    const articleString = req.body;

    const query = { id: articleString.id };

    const options = {
       multi: false,
       upsert: false
    };

    db.articles.update(query, articleString, options);

    const article = db.articles.find(query);

    res.send(article);
});

// post request for deleting article in database
app.post('/deletearticle', (req, res) => {
    const id = req.body;

    const bool = db.articles.remove(id);
    if (bool) {
        res.send(id);
    } else {
        res.send('No such article in database');
    }
    
});

app.listen(3000, () => { console.log('Port:3000'); });
