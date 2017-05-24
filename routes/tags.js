const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

const Tags = require('../mongo/db').tagModel;

router.use(bodyParser.json({ limit: '20mb' }));
router.use(bodyParser.urlencoded({ extended: true }));

// get request for getting tags from database for first time load app
router.get('/tags', (req, res) => {
    Tags.find((err, tags) => !err ? res.json(tags) : res.sendStatus(500));
});

// post request for adding tag to database
router.post('/posttags', (req, res) => {
    Tags.findOne((err, todo) => {
        if (err) {
            res.status(500).send(err);
        } else {
            todo.tags += ',' + req.body.tag;

            // Save the updated document back to the database
            todo.save((err, todo) => {
                if (err) {
                    res.status(500).send(err);
                }
                res.json(todo);
            });
        }
    });
});

module.exports = router;
