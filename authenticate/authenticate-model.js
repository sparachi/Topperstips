var mongodb = require('../backend/mongodb');
var logger = require('../app/logger')('authenticate');

exports.captureLogin = function(bodyData, callback) {

  logger.info('In captureLogin()');
  var database = mongodb.conOpen().then(function(connection) {
    logger.info('In captureLogin() Database connection opened');
    let loginDataCollection = connection.collection('logindata');
    loginDataCollection.insert(docToInsert, function(err, result){
      if(err){
        callback(err);
      } else {
        logger.info("Login data inserted succesfully" + JSON.stringify(result));
        callback(null, "Ok");
      }
    });
  }, function(err) {
      callback(err);
  });
};
