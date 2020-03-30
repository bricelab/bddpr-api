/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import '../css/app.css';

// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';

// console.log('Hello Webpack Encore! Edit me in assets/js/app.js');

const imagesContext = require.context('../img', true, /\.(png|jpg|jpeg|gif|ico|svg|webp)$/);
imagesContext.keys().forEach(imagesContext);

const routes = require('../../public/resources/js/fos_js_routes.json');
import Routing from '../../vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router.min.js';

Routing.setRoutingData(routes);

var localItems = [];

fetchData("", "");

export function performAjaxRequest(route, type, dataType, data, onRequestSuccess, onRequestFailure, onRequestCompletion){

    console.log(route, data);
  
      $.ajax({
  
            url       : 	route,
            dataType  : 	dataType,
            type      : 	type,
            data      : 	data,
            contentType:  "application/json",
            // headers   :   {"Authorization": "Bearer "+Cookies.get(TOKEN_COOKIE_NAME)},
            
            success   :   onRequestSuccess,
            error     : 	onRequestFailure,
            complete 	: 	onRequestCompletion,
  
      });
    
  }

export function fetchData(field, value){

    var route = Routing.generate('app_mandats_fetch_action', { "page": 1 }); // site_url+"/api/search?field="+field+"&q="+value;
  
    $("table tbody").empty();
    
    if ($(".spinner-border").length == 0){
      $("table").parent().append('<div class = "text-center pt-5">\
                                  <div class="spinner-border" role="status">\
                                      <span class="sr-only">Loading...</span>\
                                  </div>\
                                </div>');
    }
    
    performAjaxRequest(route, "GET", "json", "", onDataFetchSuccess, onDataFetchFailure, onDataFetchCompletion);
}

function onDataFetchSuccess(response, status){

  // saving the received data in a local javascript array

  localItems = response.mandats;

  displayData(response, status);

  // removing possible spinners from the interface
  $(".spinner-border").parent().remove();

  $(".modal.show").modal("hide");
}

export function onDataFetchFailure(response, status, error){
  console.log("Failed to search data : ", response, status, error);
}

function onDataFetchCompletion(response, status){

}

function displayData(data, status){
    console.log(data);

    data.mandats.forEach(element => {

        if (element.archived == false){
            $("table tbody").append('<tr data-id = "'+element.id+'">\
                <th scope="row">'+element.fugitif.nom+'</th>\
                <td>'+element.fugitif.prenoms+'</td>\
                <td>'+element.infractions+'</td>\
                <td>'+element.juridictions+'</td>\
                <td>\
                    <img class = "delete_menu_action" style = "cursor: pointer;" src = "'+delete_icon+'" alt = "" width = "" height = "" title = "Supprimer"/>\
                    <img class = "edit_menu_action" style = "cursor: pointer;" src = "'+edit_icon+'" alt = "" width = "" height = "" title = "Modifier" data-toggle="modal" data-target="#dataModal"/>\
                </td>\
            </tr>');
        }

    });

    for (let i = 1; i < data.pages; i++) {
        // const element = array[i];
        $("ul.pagination li:last").before('<li class="page-item"><a class="page-link" href="{{path(\'app_backend\', {"page": '+i+'})}}">'+i+'</a></li>');
        if (i == 3){
            $("ul.pagination li:last").before('<li class="page-item"><a class="page-link read-only">...</a></li>');
            break;
        }
    }

    $("ul.pagination li:last").before('<li class="page-item"><a class="page-link" href="{{path(\'app_backend\', {"page": '+(data.pages-1)+'})}}">'+(data.pages-1)+'</a></li>');

    $(".spinner-border").parent().remove();
}


var currentItemId = 0;



$("body").on("click", ".edit_menu_action", function(){

    // retrieve corresponding object
    var trTag = $(this).parents("tr");
    var itemId = trTag.attr("data-id");
    currentItemId = itemId;
    var object = getCurrentObject();

    $($(this).attr("data-target")).find("form").removeClass("add-data");
    $($(this).attr("data-target")).find("form").addClass("update-data");
    $($(this).attr("data-target")).find("form").attr("data-id", currentItemId);
    fillModalFormFields(object);
});

function fillModalFormFields(object){

    // fill the form's fields
    console.log(object);

    $("input[name='nom']").val(object.fugitif.nom);
    $("input[name='prenoms']").val(object.fugitif.prenoms);
    $("input[name='nommarital']").val(object.fugitif.prenoms);
    $("input[name='adresse']").val(object.fugitif.adresse);
    $("input[name='alias']").val(object.fugitif.alias);
    $("input[name='surnom']").val(object.fugitif.surnom);
    $("input[name='lieunaissance']").val(object.fugitif.lieuNaissance);
    $("input[name='datenaissance']").val(object.fugitif.dateNaissance);
    $("input[name='taille']").val(object.fugitif.taille);
    $("input[name='poids']").val(object.fugitif.poids);
    $("input[name='numerotelephone']").val(object.fugitif.numeroTelephone);
    $("textarea[name='observations']").val(object.fugitif.observations);
    // $("input[name='numeropieceid']").val(object.numeroPieceId);
    $("input[name='infractions']").val(object.infractions);
    $("input[name='chambres']").val(object.chambres);
    $("input[name='juridictions']").val(object.juridictions);
    $("input[name='reference']").val(object.reference);

    $("[name='typemandat'] option").attr("selected", false);
    $("[name='typemandat']").find("option[value='"+object.typeMandat.libelle+"']").attr("selected", true);

    $("[name='execute'] option").attr("selected", false);
    $("[name='execute']").find("option[value='"+object.execute+"']").attr("selected", true);

    $("[name='sexe'] option").attr("selected", false);
    $("[name='sexe']").find("option[value='"+object.fugitif.sexe+"']").attr("selected", true);

    if (object.fugitif.listeNationalites.length){
        $("[name='nationalite'] option").attr("selected", false);
        $("[name='nationalite']").find("option[value='"+(object.fugitif.listeNationalites[0]).nationalite.libelle+"']").attr("selected", true);
    }   
}

$("#btnSearch").click(function(){
    var criteria = $("#criteriaSelectTag").val();
    var criteriaValue = $("#searchInput").val();

    fetchData(criteria, criteriaValue);
});

$("#btnInitiate").click(function(){
    $("#searchInput").val("");
    $("#criteriaSelectTag option[value='all']").attr("selected", true);

    $("table tbody").empty();
});

$("body").on("click", ".delete_menu_action", function(){

    var trTag = $(this).parents("tr");
    var itemId = trTag.attr("data-id");
    currentItemId = itemId;
    var response = confirm("Voulez vous vraiment supprimer ce mandat id : "+itemId+" relatif à l'utilisateur : "+ trTag.children().first().text());
    if (response == true)
        deleteItem(itemId);
});

function deleteItem(id){

    var route = site_url+"/api/mandat/"+id;
    // var data = "class=Fugitif&property=id&value="+id;
    
    performAjaxRequest(route, "DELETE", "json", "", onItemDeletionSuccess, onItemDeletionFailure, onItemDeletionCompletion);
}

function onItemDeletionSuccess(response, status){
    if (status == "success"){
        $("table tr[data-id='"+currentItemId+"']").remove();
        toast("Item deleted successfully");
    }
}

function onItemDeletionFailure(response, status, error){
    console.log("Failed to delete item", response, status, error);

}

function onItemDeletionCompletion(response, status){
    console.log("request completed");
}




$("#btnSave").click(function(e){
    e.preventDefault();
    
    var form = $("#dataModal form");

    if (form.hasClass("update-data"))
        updateData(form);
    else if (form.hasClass("add-data"))
        addData(form);
});

function updateData(form){


    var object = getCurrentObject();
    console.log("--------------", object);
    var route = site_url+"/api/fugitif/"+object.id;
    var data = JSON.stringify(getJsonObject(form));

    performAjaxRequest(route, "PUT", "json", data, onDataUpdateSuccess, onDataUpdateFailure, onDataUpdateCompletion);
}

function onDataUpdateSuccess(response, status){
    console.log("OK : ", response);
    if (status == "success"){
        $(".modal.show").modal("hide");
        toast("data updated successfully");
    }
}

function onDataUpdateFailure(response, status, error){
    console.log(response, status);
}

function onDataUpdateCompletion(response, status){
    console.log("Ajax request completed");
}


function addData(form){
    var route = site_url+"/api/fugitif";
    var data = JSON.stringify(getJsonObject(form));

    performAjaxRequest(route, "POST", "json", data, onDataAdditionSuccess, onDataAdditionFailure, onDataAdditionCompletion);
}

function onDataAdditionSuccess(response, status){
    console.log("OK : ", response);
    if (status == "success"){
        $(".modal.show").modal("hide");
        toast("data added successfully");
    }
}

function onDataAdditionFailure(response, status, error){
    console.log(response, status);
}

function onDataAdditionCompletion(response, status){
    console.log("Ajax request completed");
}

function getJsonObject(form){

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy+"-"+mm+"-"+dd;

    var jsonObject = 
    {
        "nom": form.find("[name='nom']").val(),
        "prenoms": form.find("[name='prenoms']").val(),
        "nomMarital": "",
        "alias": form.find("[name='alias']").val(),
        "surnom": form.find("[name='surnom']").val(),
        "dateNaissance": ((form.find("[name='datenaissance']").val() == "") ? null : form.find("[name='datenaissance']").val()),
        "lieuNaissance": form.find("[name='lieunaissance']").val(),
        "adresse": form.find("[name='adresse']").val(),
        "taille": null,
        "poids": null,
        "couleurYeux": null,
        "couleurPeau": null,
        "couleurCheveux": null,
        "photoName": null,
        "photoSize": null,
        "sexe": form.find("[name='sexe']").val(),
        "numeroPieceID": form.find("[name='numeropieceid']").val(),
        "numeroTelephone": form.find("[name='numerotelephone']").val(),
        "observations": form.find("[name='observations']").val(),
        "mandats": [
            {
                "reference": form.find("[name='reference']").val(),
                "execute": ((form.find("[name='execute']").val() == "oui") ? true : false),
                "infractions": form.find("[name='infractions']").val(),
                "chambres": form.find("[name='chambres']").val(),
                "juridictions": form.find("[name='juridictions']").val(),
                "archived" : false,
                "typeMandat": {
                    "libelle": form.find("[name='typemandat']").val()
                },
                "dateEmission": ((form.find("[name='dateemission']").val() == "") ? today : form.find("[name='dateemission']").val())
            }
        ],
        "listeNationalites": [
            {
                "nationalite": {
                    "libelle": form.find("[name='nationalite']").val()
                },
                "principale": true
            }
        ]
    };
    console.log("test", jsonObject);
    return jsonObject;
}

$("#dropdown-item-add").click(function(){

    // clearing modal fields before displaying it
    var modal = $($(this).attr("data-target"));

    modal.find("input.form-control").val("");

    $($(this).attr("data-target")).find("form").removeClass("update-data");
    $($(this).attr("data-target")).find("form").addClass("add-data");
});

function getCurrentObject(){

  var object = null;
  console.log("before : ", currentItemId, localItems);
    for (let i = 0; i < localItems.length; i++) {
        var mandat = (localItems[i]);
        if (mandat.id == currentItemId){
            object = mandat;
            break;
       }
    }
  return object;
}

function toast(message) {

  var snackbar = $("#snackbar");
  snackbar.text(message);
  snackbar.addClass("show");

  // After 3 seconds, remove the show class from DIV
  setTimeout(function(){ snackbar.removeClass("show"); }, 3000);
} 



$("#loginModal .form-control").on("keypress", function(){
  $(this).removeClass("is-invalid");
});