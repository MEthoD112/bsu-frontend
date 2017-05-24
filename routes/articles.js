const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

const Articles = require('../mongo/db').articleModel;
const Images = require('../mongo/db').imageModel;

router.use(bodyParser.json({ limit: '20mb' }));
router.use(bodyParser.urlencoded({ extended: true }));

// get request for getting articles from database for first time load app
router.get('/articles', (req, res) => {
    Articles.find((err, articles) => !err ? res.json(articles) : res.sendStatus(500));
});

// post request for adding article to database
router.post('/articles', (req, res) => {
    const promiseAddArticle = new Promise((resolve, reject) => {
        const article = new Articles(req.body);
        article.save();
        resolve(Articles.find({ id: req.body.id }));
    });
    promiseAddArticle.then(result => res.json(result));
});

// post request for editting article in database
router.put('/editarticle', (req, res) => {
    const articleString = req.body;
    const query = { id: articleString.id };

    Articles.findOne(query, (err, todo) => {
        // Handle any possible database errors
        if (err) {
            res.status(500).send(err);
        } else {
            todo.title = req.body.title || todo.title;
            todo.summary = req.body.summary || todo.summary;
            todo.content = req.body.content || todo.content;
            todo.tags = req.body.tags || todo.tags;
            //console.log(todo);
            // Save the updated document back to the database
            todo.save((err, todo) => {
                if (err) {
                    res.status(500).send(err);
                }
                res.send(todo);
            });
        }
    });
});

// post request for deleting article in database
router.delete('/deletearticle', (req, res) => {
    const id = req.body;

    Images.findOneAndRemove(id, (err, todo) => {
    });
    Articles.findOneAndRemove(id, (err, todo) => {
        const response = {
            message: 'Article successfully deleted',
            id: id.id
        };
        res.json(response);
    });
});

module.exports = router;
