/**
 * 
 * 
 * 
 */

var site_url = "http://localhost:8000";
var TOKEN_COOKIE_NAME = "bddpr-api-token";
var localItems = [];

// var site_url = "http://localhost/web_projects/Professional_Projects/bddpr-api/public";

// display the login modal on the first look to the page
// Cookies.remove(TOKEN_COOKIE_NAME);
if (Cookies.get(TOKEN_COOKIE_NAME) == undefined)
    $(".modal#loginModal").modal();
else{
  console.log("Token", Cookies.get(TOKEN_COOKIE_NAME));
  fetchData("", "");
}

function getCurrentObject(){

  var object = null;
  console.log("before : ", currentItemId);
    for (let i = 0; i < localItems.length; i++) {
        const element = localItems[i];
        var found = false;
        for (let j = 0; j < element.mandats.length; j++) {
            const mandat = element.mandats[j];
            if (mandat.id == currentItemId){
                element.mandats.mandat = mandat;
                object = element;
                found = true;
                break;
           }
        }
        if (found)
            break;
    }
  return object;
}
    

// Generic functions
function requestToken(route, type, dataType, data, onRequestSuccess, onRequestFailure, onRequestCompletion){

  console.log(route, data);

	$.ajax({

          url       : 	route,
          dataType  : 	dataType,
          type      : 	type,
          data      : 	data,
          contentType:  "application/json",
          
          success   :   onRequestSuccess,
          error     : 	onRequestFailure,
          complete 	: 	onRequestCompletion,
    });
}

function performAjaxRequest(route, type, dataType, data, onRequestSuccess, onRequestFailure, onRequestCompletion){

  console.log(route, data);

	$.ajax({

          url       : 	route,
          dataType  : 	dataType,
          type      : 	type,
          data      : 	data,
          contentType:  "application/json",
          headers   :   {"Authorization": "Bearer "+Cookies.get(TOKEN_COOKIE_NAME)},
          
          success   :   onRequestSuccess,
          error     : 	onRequestFailure,
          complete 	: 	onRequestCompletion,

    });
  
}

function toast(message) {

  var snackbar = $("#snackbar");
  snackbar.text(message);
  snackbar.addClass("show");

  // After 3 seconds, remove the show class from DIV
  setTimeout(function(){ snackbar.removeClass("show"); }, 3000);
} 

$(".btn#loginBtn").click(function(){

  var email = $("#loginModal .form-control[type='email']").val();
  var password = $("#loginModal .form-control[type='password']").val();

  var route = site_url+"/auth_token";
  var data = JSON.stringify({"email": email, "password": password});

  requestToken(route, "POST", "json", data, onAuthSuccess, onAuthFailure, onAuthCompletion);

});

function onAuthSuccess(response, status){
  if (status == "success"){
      console.log("Setting cookies ! ");
      Cookies.set(TOKEN_COOKIE_NAME, response.token);
      $(".modal#loginModal").modal("hide");
      toast("Authenticated successfully ! ");

      // then, all data are upload 
      fetchData("", "");
  }
  else{
    toast("Invalid credentials");
    $("#loginModal").find(".form-control").addClass("is-invalid");
    console.log(response, status);
  }
}

function onAuthFailure(response, status, error){
  toast("Invalid credentials");
  $("#loginModal").find(".form-control").addClass("is-invalid");
  console.log(response, status);
}

function onAuthCompletion(response, status){
  console.log("Ajax request completed");
}

$("#loginModal .form-control").on("keypress", function(){
  $(this).removeClass("is-invalid");
});

function fetchData(field, value){

  var route = site_url+"/api/search?field="+field+"&q="+value;
  console.log(route);
  
  performAjaxRequest(route, "GET", "json", "", onDataFetchSuccess, onDataFetchFailure, onDataFetchCompletion);
}

function onDataFetchSuccess(response, status){

  // saving the received data in a local javascript array
  localItems = response;

  displayData(response, status);

  // removing possible spinners from the interface
  $(".spinner-border").parent().remove();
}

function onDataFetchFailure(response, status, error){
  console.log("Failed to search data : ", response, status, error);
}

function onDataFetchCompletion(response, status){

}

