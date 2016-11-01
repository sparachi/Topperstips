'use strict';
const mongoClient = require('mongodb').MongoClient;
const config = require('../app/config');
const logger = require('../app/logger')('mongodb');
let state = {
    db : null
}
// Connection URL. This is where your mongodb server is running.
let url = 'mongodb://' + config.mongodb.host + ':' + config.mongodb.port +
            '/' + config.mongodb.dbname;

exports.conOpen = function(){
    logger.info("In conOpen()");
    return new Promise(function(resolve, reject){
        logger.info("In conOpen() Promise");
        if(state.db) {
          logger.info("In conOpen() returning db from state")
          resolve(state.db);
        } else {
          // Use connect method to connect to the Server
          mongoClient.connect(url, (err, db) => {
              if (err) {
                  logger.info("In conOpen() mongodb error");
                  reject(err);
              } else {
                  logger.info("In conOpen() mongodb connected succesfully");
                  state.db = db;
                  resolve(db);
              }
          });
        }
    });
}

exports.conDb = function() {
  logger.info("In conDb()");
  return conOpen();
}

exports.conClose = function(){
    logger.info("In conClose()");
    //Close connection
    if(state.db){
        state.db.close();
    }
};
