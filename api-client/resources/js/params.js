/**
 * 
 * 
 * 
 */

// var site_url = "http://localhost:8000";

var site_url = "http://localhost/web_projects/Professional_Projects/bddpr-api/public";


// Generic functions
function performAjaxRequest(route, type, dataType, data, onRequestSuccess, onRequestFailure, onRequestCompletion){

	$.ajax({

      url       : 	route,
      dataType  : 	dataType,
      type      : 	type,
      data      : 	data,
      
      success   :   onRequestSuccess,
      error     : 	onRequestFailure,
      complete 	: 	onRequestCompletion,
    });
}

