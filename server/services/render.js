/* We are exporting the homeRoutes variable and inside
 homeRoutes variable we are storing the cb function 
 so that we can use the cb function  in router.js */
const axios = require("axios");

exports.homeRoutes = (req, res) => {
  //We will pass the data i.e users as well as the file name as paramter to index.ejs file
  //Make a GET request to api/users using axios model to fetch all the data object from the database and store it in the response variable
  axios
    .get("http://localhost/api/users")
    .then(function (response) {
      //response variable contains all the object data of the DB
      res.render("index", { users: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.add_user = (req, res) => {
  res.render("add_user");
};

exports.update_user = (req, res) => {
  axios
    .get("http://localhost/api/users", { params: { id: req.query.id } })
    .then(function (userdata) {
      console.log(userdata.data);
      res.render("update_user", { user: userdata.data });
    })
    .catch((err) => {
      res.send(err);
    });
};
