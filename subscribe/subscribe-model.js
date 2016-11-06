// Maybe this is just some "joi" schema or uses an ORM like bookshelf etc

var mongodb = require('../backend/mongodb');
var logger = require('../app/logger')('subscribe');



exports.getSubscribers = function(callback) {

  var database = mongodb.conOpen().then(function(connection) {
    let subscribersCollection = connection.collection('subscribers');
    subscribersCollection.find({}).toArray(function(err, docs){
      if(err){
        callback(err);
      } else {
        logger.info("subscribers document" + docs);
        callback(docs);
      }
    });
  }, function(err) {
      callback(err);
  });
};

exports.addSubscriber = function(email, callback) {
  logger.info('In addSubscriber()');
  var database = mongodb.conOpen().then(function(connection) {
    logger.info('In addSubscriber() Database connection opened');
    let subscribersCollection = connection.collection('subscribers');
    let docToInsert = { "sub_name":"", "sub_email": email};
    subscribersCollection.insert(docToInsert, function(err, docs){
      if(err){
        callback(err);
      } else {
        logger.info("subscribers document" + JSON.stringify(docs));
        callback(null, "Ok");
      }
    });
  }, function(err) {
      callback(err);
  });

};
