
const mongoose = require('mongoose');
const db = mongoose.createConnection('mongodb://MEthoD:42271112174@ds147421.mlab.com:47421/newsportal');

db.on('error', err => console.log('connection error to DB.', err.message));
db.once('open', callback => console.log('connected to DB'));

const articleModel = new mongoose.Schema({
    id: String,
    author: String,
    title: String,
    content: String,
    summary: String,
    createdAt: Date,
    tags: [String]
});

const userModel = new mongoose.Schema({
    username: String,
    password: String
});

const tagModel = new mongoose.Schema({
    tags: [String]
});

const imageModel = new mongoose.Schema({
    id: String,
    image: String
});

module.exports.articleModel = db.model('articleModel', articleModel);
module.exports.userModel = db.model('userModel', userModel);
module.exports.tagModel = db.model('tagModel', tagModel);
module.exports.imageModel = db.model('imageModel', imageModel);
