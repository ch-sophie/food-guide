const express = require("express");

// define routes
// recordRoutes is an instance of the express router
// router as a middleware to take control of requests starting with path /record
const recordRoutes = express.Router();
 
// connect to database
const dbo = require("../db/conn");
 
// convert id from string to ObjectId for the _id
const ObjectId = require("mongodb").ObjectId;
 
// get all
recordRoutes.route("/record").get(function (req, res) {
  let db_connect = dbo.getDb("restaurant");
  db_connect.collection("records").find({}).toArray(function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// get one by id
// recordRoutes.route("/record/:id").get(function (req, res) {
//   let db_connect = dbo.getDb();
//   let myquery = { _id: ObjectId(req.params.id) };
//   db_connect.collection("records").findOne(myquery, function (err, result) {
//     if (err) throw err;
//     res.json(result);
//   });
// });
// get one by id method
recordRoutes.route("/record/:id").get(async (req, res) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  try {
      const data = await db_connect.collection("records").findOne(myquery);
      res.json(data)
  }
  catch (error) {
      res.status(500).json({ message: error.message })
  }
})

// test getAll except _id
// recordRoutes.route("/record").get(function (req, res) {
//     let db_connect = dbo.getDb("restaurant");
//     db_connect.collection("records").find({}, {projection: {_id: 0, name: 1, adress: 1, note: 1, category: 1}}).toArray(function (err, result) {
//       if (err) throw err;
//       res.json(result);
//     });
//   }); 

// create post
recordRoutes.route("/record/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    name: req.body.name,
    address: req.body.address,
    note: req.body.note,
    category: req.body.category,
  };
  db_connect.collection("records").insertOne(myobj, function (err, res) {
    if (err) throw err;
    console.log("1 record created");
    response.json(res);
  });
});
 
// update patch
recordRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      name: req.body.name,
      address: req.body.address,
      note: req.body.note,
      category: req.body.category,
    },
  };
  db_connect.collection("records").updateOne(myquery, newvalues, function (err, res) {
    if (err) throw err;
    console.log("1 record updated");
    response.json(res);
  });
});
 
// delete 
recordRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("records").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 record deleted");
    response.json(obj);
  });
});
 
module.exports = recordRoutes;