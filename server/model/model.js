const mongoose = require("mongoose");

// Creating the schema or blueprint of a DB using mongoose.Schema()

var schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: String,
  status: String,
});

/*
 A Mongoose model is a wrapper on the Mongoose schema. A Mongoose schema defines the structure of the document, default values, 
 validators, etc., whereas a Mongoose model provides an interface to the database for creating, querying, updating, deleting records, etc

name of the document/schema/collection : userdb [can give any name] | Database Name :users
passing the structure of the document i.e is scehma to create an interface of the schema
 */
const Userdb = mongoose.model("userdb", schema);

//exporting the module so that the controllers can use this module
module.exports = Userdb;
