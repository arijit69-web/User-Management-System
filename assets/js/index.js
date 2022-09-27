//When I click on the save button having id as add_user / on submitting the from / when submit event occurs,this function will be called

$("#add_user").submit(function (event) {
  alert("Data Inserted Successfully!");
});

/*Jab main update /user-main save button click karunga
I want to submit this form and update the current new data
but I don't have any action="" attribute to this form having id="update_user"
as I don't want to redirect the user to anywhere else*/

//When submit event occurs I want to execute the function with event parameter
$("#update_user").submit(function (event) {
  event.preventDefault(); //stop or prevent reloading the browser after clicking the submit button as by default it reload the browser after clicking the submit button

  var unindexed_array = $(this).serializeArray(); //this method will going to return a serialize array of data
  var data = {};

  $.map(unindexed_array, function (n, i) {
    data[n["name"]] = n["value"]; // I am creating an object of the updated data like this -> {name:"Arijit Sarkar",email:"arijit123@gmail.com",gender:"Male",status:"Vaccinated"} and storing this object in the 'data' variable
  });

  /*Inside the request object I am going to pass the value to the AJAX and I am going to use AJAX to make a request to the server and get the response from the server
In the AJAX request we are passing 
- [URL : http://localhost/api/users/${data.id}} we are passing the data.id as a query paramter as we want to update the data of a particular user
- object: data
- [PUT method] 
and this will call the route - [route.put("/api/users/:id", controller.update);] in router.js file
*/
  var request = {
    url: `http://localhost/api/users/${data.id}`,
    method: "PUT",
    data: data,
  };

  //If we have successfull request / done event occurs, this function will be called
  $.ajax(request).done(function (response) {
    alert("Data Updated Successfully!");
  });
});

/*If it is root path then execute this function as I don't have any href attribute in the delete icon anchor tag 
On clicking the anchor tag I will not navigate the user to anywhere else
*/
if (window.location.pathname == "/") {
  $ondelete = $(".table tbody td a.delete"); //Inside [<table> tag -> <tbody> tag -> <td> tag -> <a> tag -> delete class selector
  //When I click on this trash icon /click event occurs then execute this function
  $ondelete.click(function () {
    //fetching the data-id of the anchor tag and using this id we can recognise which user to delete from the DB
    var id = $(this).attr("data-id");
    /*
In the AJAX request we are passing 
- [URL : http://localhost/api/users/${data.id}} we are passing the data.id as a query paramter as we want to delete the data of a particular user
- [DELETE method] 
and this will call the route - [route.delete("/api/users/:id", controller.delete);] in router.js file
*/
    var request = {
      url: `http://localhost/api/users/${id}`,
      method: "DELETE",
    };

    //Confirmation to delete the data

    if (confirm("Do you really want to delete this record?")) {
      $.ajax(request).done(function (response) {
        alert("Data Deleted Successfully!");
        location.reload(); // reload the browser to fetch the new updated data from the DB
      });
    }
  });
}
