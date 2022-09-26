const express = require("express");
const dotenv = require("dotenv"); // env file contains the individual user environment variables that override the variables set eg DB password etc.
const morgan = require("morgan"); // logs the requests along with some other info.
const bodyparser = require("body-parser"); //In order to get access to the post data we have to use body-parser
const path = require("path");
const connectDB = require("./server/database/connection");
const app = express();
dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 80;

//log requests
app.use(morgan("tiny"));

//MongoDB connection
connectDB();

//parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true }));

//set view engine
app.set("view engine", "ejs");

/*app.set('views',path.resolve(__dirname,"views/ejsFolder"));
//if we
 store our ejs files in the ejsFolder (inside the views folder) instead of in the views folder then we have to set the path of ejs files externally 
*/

//load asstes
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
/* To access the css file in /assets/css/ we don't have 
to write /assets/css/style.css we can just write it like 
/css/style.css  - Just specify the virtual path and file name */
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

//Load Routers
app.use("/", require("./server/routes/router"));
/* app.use and specify the path '/'  that we will use to access 
and add the path of the router file that we have to import './server/routes/router' */
app.listen(PORT, () => {
  console.log("Server is Running @ PORT : 80");
});
