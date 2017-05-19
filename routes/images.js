const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

const Images = require('../mongo/db').imageModel;

router.use(bodyParser.json({ limit: '20mb' }));
router.use(bodyParser.urlencoded({ extended: true }));

// get request for getting images from database for first time load app
router.get('/images', (req, res) => {
    Images.find((err, images) => !err ? res.json(images) : res.sendStatus(500));
});

// post for adding image
router.post('/addfoto', (req, res) => {
    const promiseAddImage = new Promise((resolve, reject) => {
        const image = new Images(req.body);
        image.save();
        resolve(Images.find({ id: req.body.id }));
    });
    promiseAddImage.then(result => res.json(result));
});

// post for editing image
router.put('/editfoto', (req, res) => {
    const articleString = req.body;
    const query = { id: articleString.id };

    Images.findOne(query, (err, todo) => {
        // Handle any possible database errors
        if (err) {
            res.status(500).send(err);
        } else {
            if (!todo) {
                const image = new Images({ id: articleString.id, image : articleString.image });
                image.save((err, todo) => {
                if (err) {
                    res.status(500).send(err);
                }
                res.json(todo);
                });
            } else {
                todo.image = req.body.image || todo.image;

                // Save the updated document back to the database
                todo.save((err, todo) => {
                    if (err) {
                        res.status(500).send(err);
                    }
                    res.json(todo);
                });
            }
        }
    });
});

module.exports = router;
