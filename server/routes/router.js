const express = require("express");
/* const app=express(); ->This will create a new app of express()
Instead of creating new app I gonna call a method of express - express.Router()
This method allows us to create different router in a separate file */
const route = express.Router();

/* importing the ../services/render file to access the cb functions*/
const services = require("../services/render");
const controller = require("../controller/controller");
/* Instead of creating the call back functions inside
the router.get() method we will separate this cb function inside the services */
/**
 * @description Root Route
 * @method GET /
 */
route.get("/", services.homeRoutes); //we are accessing the cb functions in render file using services variable
/**
 * @description add users
 * @method GET /add-users
 */
route.get("/add-user", services.add_user);
/**
 * @description update user
 * @method GET /update-user
 */
route.get("/update-user", services.update_user);

//API Routes
/*To create or add new user or send data to the server POST method is used
Route path of the POST req to add user is /api/users

To fetch all data/single data from the server we use GET method 

To update the existing data on the server we use PUT method and pass the :id variable in the URL
To delete the data from the DB we use delete method and pass the :id variable in the URL

*/
route.post("/api/users", controller.create);
/*When save button is clicked it will redirect the post request to this route
and if the POST method and the route is matched it will go to controller.js and call create method 
*/ 


route.get("/api/users", controller.find);
//display all the users's data from the DB as response data in JSON format

route.put("/api/users/:id", controller.update);

route.delete("/api/users/:id", controller.delete);

module.exports = route;
//Export this module using 'route' variable so that we can use it in Server.js
