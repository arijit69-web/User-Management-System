const mongoose = require("mongoose"); //Using mongoose module we can connect MongoDB database with the app

const connectDB = async () => {
  try {
    /*
    call the method of mongoose that is mongoose.connect() and pass the parameters MONGO_URI ,
    Mongo_URI -> to connect the DB with our application Mongo_URI contains username, DB Name and password of our DB
    */
    const con = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB connected : ${con.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;

// exporting the module in the variable connectDB() so that we can use the module in the server.js
