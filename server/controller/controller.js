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
      res.redirect("/");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Creation Failed : Some error occured !",
      });
    });
};

exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    Userdb.findById(id)
      .then((data) => {
        if (!data) {
          res
            .status(404)
            .send({ message: "Searching Failed : Some error occured !" });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Searching Failed : Some error occured !" });
      });
  } else {
    Userdb.find()
      .then((user) => {
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
  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        //Ager data nahi aya then Error
        res
          .status(404)
          .send({ message: "Updating Failed : Some error occured !" });
      } else {
        //display data
        res.send(data);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Updating Failed : Some error occured !" });
    });
};

//delete a identified user by user id
exports.delete = (req, res) => {
  const id = req.params.id; //I will get the id value from the URL request

  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: "Deleting Failed : Some error occured !" });
      } else {
        res.send({ message: "User was deleted successfully!" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Deleting Failed : Some error occured !",
      });
    });
};
