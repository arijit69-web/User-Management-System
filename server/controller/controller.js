/*Using controller model we can select, update,delete and create records*/

var Userdb = require("../model/model");

/*Now to create the data or send the data to the server we need POST method
and the API POST method/Route path we will create in the router.js File
*/
//retrieve and return all the users / retrieve and return single user

exports.create = (req, res) => {
  // Validate a request
  if (!req.body) {
    res.status(400).send({ message: "Data cannot be empty" });
    return;
  }

  //Create new User
  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  //save data in the DB
  /*
    .save(object_name)-> will save the user's data in the DB
    .then(cb function)-> promise method and return the saved data to the user
    .catch(err)-> if any error occured go to catch method
    */
  user
    .save(user)
    .then((data) => {
      res.redirect("/");//we will redirect the user to the root path
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Creation Failed : Some error occured !",
      });
    });
};

exports.find = (req, res) => {
  if (req.query.id) {
    /*Fetching a single user data from the DB instead of all the users
    Instead of creating different routes we are creating same route to fetch data of single and multiple users
    
    If there is id query parameter in the URL then we want to find only single user data and if there is no id query parameter in the url 
    we want to find data of all the users
    */
    const id = req.query.id;

    Userdb.findById(id)
      .then((data) => {
        if (!data) {
          res
            .status(404)
            .send({ message: "Searching Failed : Some error occured !" });
        } else {
          res.send(data);
          /*We are sending the data as response [JSON format] in the URL - http://localhost/api/users ,now axios module in render.js
           will fetch all the data object from this URL using the get(http://localhost/api/users) method and send the object data to 
           EJS to diplay in client-side*/
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Searching Failed : Some error occured !" });
      });
  } else {
    /*
      Userdb.find() fetch all the users' data from the database and display in the website
    */
    Userdb.find()
      .then((user) => {
        // sending the user from the server to client side
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Searching Failed : Some error occured !",
        });
      });
  }
};

//update a identified user by user id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Content cannot be empty" });
  }
  const id = req.params.id; //I will get the id value from the URL request
  //It will find the data by id and update the old data with the new one that have come from the req.body

  /*findByIdAndUpdate is a method that takes 3 inputs as a parameters
id of the object that we will update | and the data that we want to update
and we use useFindAndModify:false to avoid warning in the console
 */
  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        //Ager data nahi aya then Error
        res
          .status(404)
          .send({ message: "Updating Failed : Some error occured !" });
      } else {
        //or else display data
        res.send(data);
      }
    })
    .catch((err) => {
      // Ager koi Exception agya to
      res
        .status(500)
        .send({ message: "Updating Failed : Some error occured !" });
    });
};

//delete a identified user by user id
exports.delete = (req, res) => {
  const id = req.params.id; //I will get the id value from the URL request
  /*
 Userdb.findByIdAndDelete() method take id as a parameter and delete that data from the DB
*/
  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        //Ager koi data nahi mila uss id ka
        res
          .status(404)
          .send({ message: "Deleting Failed : Some error occured !" });
      } else {
        res.send({ message: "User was deleted successfully!" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        //Ager koi exception agya to
        message: "Deleting Failed : Some error occured !",
      });
    });
};
