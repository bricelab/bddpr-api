/**
 * 
 * 
 * 
 */

function fetchData(field, value){

	$.ajax({

      url       : 	route,
      dataType  : 	"json",
      type      : 	"GET",
      data      : 	"",
      
      success   :   function(data, status){
                        displayData(data, status);

      },
      error     : 	function(response, status, error){

      },
      complete 	: 	function(response, status){

      },
    });
}

function fetchNationalites(){
    var route = site_url+"/search?field="+field+"&q="+value;
    console.log(route);
}

$("#btnSave").click(function(e){
    e.preventDefault();

    var token = prompt("Veuillez entrer votre token");
    var form = $(this).parents("form");

    form.find("#inputToken").val(token);
    // console.log(form.html());
    
    // form.submit();
    addData(form);
});

function addData(form){
    var route = site_url+"/add";
    var data = JSON.stringify(form.serialize());

    console.log(route, data);

    performAjaxRequest(route, "POST", "json", data, onDataAdditionSuccess, onDataAdditionFailure, onDataAdditionCompletion);
}

function onDataAdditionSuccess(response, status){
    if (status == "success"){
        alert("data added successfully");
    }
}

function onDataAdditionFailure(response, status, error){

}

function onDataAdditionCompletion(response, status){

}