'use strict';
const mongoClient = require('mongodb').MongoClient;
const config = require('../app/config');
let db = {
    open : open,
    close: close
}

function open(){
    // Connection URL. This is where your mongodb server is running.
    let url = 'mongodb://' + config.mongodb.host + ':' + config.mongodb.port + '/' + config.mongodb.dbname;
    return new Promise((resolve, reject)=>{
        // Use connect method to connect to the Server
        mongoClient.connect(url, (err, db) => {
            if (err) {
                reject(err);
            } else {
                resolve(db);
            }
        });
    });
}

function close(db){
    //Close connection
    if(db){
        db.close();
    }
}

exports.conOpen = open;
exports.conClose = close;
