var router = require('express').Router(),
    jwt = require('express-jwt'),
    logger = require('../app/logger')('authenticate');

// Set up our JWT authentication middleware
// Be sure to replace the YOUR_AUTH0_CLIENT_SECRET and
// YOUR_AUTHO_CLIENT_ID with your apps credentials which
// can be found in your management dashboard at
// https://manage.auth0.com
var authenticate = jwt({
  secret: new Buffer('Egv9-zJZ8Q06fydVZkM4cc8lrq7nRKrZhLrn3UA5Xf6wex-_K7c7RAuKdjqeY5NU', 'base64'),
  audience: 'w8c2hWGr4oPEAIPfW2D4foLeYHGw3yzS'
});

function verifyToken (req, res) {
  logger.info({req: req}, "verifyToken() called");
  res.status(200).send( {data: "All good. You only get this message if you're authenticated"});
}

// We include the authenticate middleware here that will check for
// a JWT and validate it. If there is a token and it is valid the
// rest of the code will execute.
router.get('', authenticate, verifyToken);

module.exports = router;
