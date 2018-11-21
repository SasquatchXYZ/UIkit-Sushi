// Require express module
const express = require('express');
const bodyParser = require('body-parser');

// Establish the express app and the PORT.
const app = express();
const PORT = process.env.PORT || 8080;


// Enable the ability to serve static content for the app from the 'public' directory.
app.use(express.static('public'));


// Parse the application body.
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// Enable Express Handlebars for Templating the HTML.
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// Import the routes to give the server access to them.
const routes = require('./controllers/sushi_controller');

app.use(routes);


// Start the server so that we can listen for client requests & log it.
app.listen(PORT, function () {
    console.log(`Server listening on http://localhost:${PORT}`)
});