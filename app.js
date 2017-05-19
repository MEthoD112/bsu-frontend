const express = require('express');

// Create server
const app = express();

// Import routes
const articles = require('./routes/articles');
const tags = require('./routes/tags');
const images = require('./routes/images');
const users = require('./routes/users');

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// Use routes
app.use('/', articles);
app.use('/', tags);
app.use('/', images);
app.use('/', users);

// Start server
app.listen(3000, () => { console.log('Port:3000'); });
