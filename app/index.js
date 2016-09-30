var express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser');

var app = express();
var whitelist = ['http://localhost:8080'];
var corsOptions = {
  origin: function(origin, callback){
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(originIsWhitelisted ? null : 'Bad Request', originIsWhitelisted);
  }
};


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//app.set('views', __dirname)
// use whatever templating system(s) you like
//app.set('view engine', 'jade')

// See the README about ordering of middleware
// Load the routes ("controllers" -ish)
//app.use(require('app/site/router'))
app.use('/api/subscriber', require('../subscribe/route'));
app.use('/api/authenticate', require('../authenticate/route'));
//app.use('/api', require('app/users/router'))
// Repeat the above line for additional model areas ("deals", "vehicles", etc)

// FINALLY, use any error handlers
app.use(require('../errors/not-found'));

// Export the app instance for unit testing via supertest
module.exports = app;


// http://stackoverflow.com/questions/13151693/passing-arguments-to-require-when-loading-module
// http://stackoverflow.com/questions/13080771/node-js-passing-variables
// http://stackoverflow.com/questions/12695591/node-js-express-js-how-does-app-router-work

// https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/
// https://expressjs.com/en/advanced/best-practice-performance.html

// http://jilles.me/express-routing-the-beginners-guide/
// http://jonathanmh.com/how-to-enable-cors-in-express-js-node-js/
// http://restlet.com/blog/2015/12/15/understanding-and-using-cors/
// https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters
