/* We are exporting the homeRoutes variable and inside
 homeRoutes variable we are storing the cb function 
 so that we can use the cb function  in router.js */
const axios = require("axios");

exports.homeRoutes = (req, res) => {
  //We will pass the data i.e users as well as the file name as paramter to index.ejs file
  /*Axios library make a GET request to [http://localhost/api/users] to fetch all the JSON data object from the client side or from the link [http://localhost/api/users] that 
  response had send as res.send(data)in controller.js @line no 60 and store it in the response variable*/
  axios
    .get("http://localhost/api/users")
    .then(function (response) {
      //response variable will contains all the users' data as an object from the DB and send to EJS so that we can display the data
     // - The 'users' variable name where we are storing 'response.data',that variable name we should use in the index.ejs file

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
      //console.log(userdata.data);
      /*[http://localhost/api/users] - this URL contains all the users' data in the JSON format
      Now we want to get the data of the single user so we will fetch 
      it with the help of id.And we will pass the id as a query paramater in the URL
      we will get the data of the specific user in the variable userdata with the help of id and pass the data to the update_user.ejs file
      So that we can see the previous records/data of that particular user/id in the update_user.ejs file
      
      - The 'user' variable name where we are storing 'userdata.data',that variable name we should use in the update_user.ejs file
      */
      res.render("update_user", { user: userdata.data });
    })
    .catch((err) => {
      res.send(err);
    });
};
