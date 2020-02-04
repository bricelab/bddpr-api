/**
 * 
 * 
 * 
 */

// fetching entities such as Nationalite
fetchEntities("Nationalite");

function fetchEntities(className){
    var route = site_url+"/"+className;

    performAjaxRequest(route, "GET", "json", "", onEntitiesFetchedSuccess, onEntitiesFetchedFailure, onEntitiesFetchedCompletion);
}

function onEntitiesFetchedSuccess(response, status){
    if (status == "success"){
        var className = response.className.split("\\");
        className = className[className.length-1];
        if (className == "Nationalite"){
            displayEntities(className, response.objects);
        }
    }
}

function onEntitiesFetchedFailure(response, status, error){
}

function onEntitiesFetchedCompletion(response, status){
    // console.log("request completed");
}

function displayEntities(className, objects){

    if (className == "Nationalite"){
        var tag = $("#selectTagNationalite");
        tag.empty();
        
        objects.forEach(element => {
            tag.append('<option value = "'+element.libelle+'">'+element.libelle+'</option>');
        });
    }
}

$("#btnSave").click(function(e){
    e.preventDefault();

    // var token = prompt("Veuillez entrer votre token");
    // var form = $(this).parents("form");

    // form.find("#inputToken").val(token);
    // console.log(form.html());
    
    // form.submit();
    addData(form);
});

function addData(form){
    var route = site_url+"/api/fugitif";
    var data = JSON.stringify(getJsonObject(form));

    // console.log(route, data);
    performAjaxRequest(route, "POST", "json", data, onDataAdditionSuccess, onDataAdditionFailure, onDataAdditionCompletion);
}

function onDataAdditionSuccess(response, status){
    if (status == "success"){
        alert("data added successfully");
    }
}

function onDataAdditionFailure(response, status, error){
    console.log(response, status);
}

function onDataAdditionCompletion(response, status){
    console.log("Ajax request completed");
}

function getJsonObject(form){

    // console.log(form.find("[name='nom']").val());
    var jsonObject = 
    {
        "nom": form.find("[name='nom']").val(),
        "prenoms": form.find("[name='prenoms']").val(),
        "nomMarital": "",
        "alias": form.find("[name='alias']").val(),
        "surnom": form.find("[name='surnom']").val(),
        "dateNaissance": null,
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
        "observations": "MANDAT D’ARRET OU CONDAMNEES ET EN FUITE",
        "mandats": [
            {
                "reference": null,
                "execute": false,
                "infractions": form.find("[name='infractions']").val(),
                "chambres": form.find("[name='chambres']").val(),
                "juridictions": form.find("[name='juridictions']").val(),
                "typeMandat": {
                    "libelle": form.find("[name='typemandat']").val()
                },
                "dateEmission": "1899-12-30T00:00:00+00:13"
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
    // console.log(jsonString);
    return jsonObject;
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
    }
}

function onAuthFailure(response, status, error){
    console.log(response, status);
}

function onAuthCompletion(response, status){
    console.log("Ajax request completed");
}