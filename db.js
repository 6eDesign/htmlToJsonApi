var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
//the MongoDB connection
var connectionInstance;

module.exports = function(callback) {
  //if already we have a connection, don't connect to database again
  if (connectionInstance) {
    callback(connectionInstance);
    return;
  }

  var db = new Db('haStats', new Server(process.env.MONGO_PORT_27017_TCP_ADDR || "127.0.0.1", process.env.MONGO_PORT_27017_TCP_PORT || 27017, { auto_reconnect: true }), {safe: true});
  db.open(function(error, databaseConnection) {
    if (error) throw new Error(error);
    connectionInstance = databaseConnection;
    callback(databaseConnection);
  });
};
