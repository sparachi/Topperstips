
var router = require('express').Router();

var subscriberModel = require('./subscribe-model');
var logger = require('../app/logger')('subscribe');

function getSubscribers (req, res) {
  logger.info({req: req}, "getSubscribers() called");
  subscriberModel.findAll(function (error, customers) {
    //res.header("Access-Control-Allow-Origin", "http://localhost:8080");
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
  //res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.status(200).send({data: req.body.subscriberEmail + " added succesfully!"});
  //res.end("subscriber created");
}

// route middleware that will happen on every request
router.use(function(req, res, next) {

    // log each request to the console
    logger.info(req.method, req.url);

    // TODO perform token validation, authentication etc..

    // continue doing what we were doing and go to the route
    next();
});

router.post('/subscriber', createSubscribers);
router.get('/subscriber', getSubscribers);

module.exports = router;
