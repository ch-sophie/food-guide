// connection database
const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const restaurant = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
var _db;
 
module.exports = {
  connectToServer: function (callback) {
    restaurant.connect(function (err, db) {
      if (db)
      {
        _db = db.db("list");
        console.log("Successfully connected to MongoDB."); 
      }
      return callback(err);
         });
  },
 
  getDb: function () {
    return _db;
  },
};