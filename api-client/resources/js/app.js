/**
 * 
 * 
 * 
 */

var site_url = "http://localhost:8000";
var TOKEN_COOKIE_NAME = "bddpr-api-token";

// var site_url = "http://localhost/web_projects/Professional_Projects/bddpr-api/public";

// display the login modal on the first look to the page
// Cookies.remove(TOKEN_COOKIE_NAME);
if (Cookies.get(TOKEN_COOKIE_NAME) == undefined)
    $(".modal#loginModal").modal();
    

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