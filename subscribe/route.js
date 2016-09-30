
var router = require('express').Router();

var subscriberModel = require('./subscribe-model');
var logger = require('../app/logger')('subscribe');

function getSubscribers (req, res) {
  logger.info({req: req}, "getSubscribers() called");
  subscriberModel.findAll(function (error, customers) {
    if (error) {
      logger.error(error, 'error finding subscribers');
      res.status(500).send(error);
      logger.info("Response sent is " + res);
      return;
    }
    logger.info("Response sent is " + res);
    res.json(customers);
  })
}

function createSubscribers (req, res) {
  logger.info("createSubscribers() called and request is \n");
  logger.info(req.body.subscriberEmail);
  res.status(200).send({data: req.body.subscriberEmail + " added succesfully, Hurray!"});
}

// route middleware that will happen on every request
router.use(function(req, res, next) {

    // log each request to the console
    logger.info(req.method, req.url);

    // TODO perform token validation, authentication etc..

    // continue doing what we were doing and go to the route
    next();
});

// api/subscriber end point is already created in index.js file,
// so we need to provide only additional parameters here
router.post('', createSubscribers);
router.get('', getSubscribers);

module.exports = router;
