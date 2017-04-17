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
    const promiseArticle = new Promise((resolve, reject) => {
        resolve(db.articles.find());
    });

    promiseArticle.then(result => res.send(result));
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
        resolve(id);
    });    
    promiseDeleteArticle.then(result => res.send(result));
});

app.listen(3000, () => { console.log('Port:3000'); });
