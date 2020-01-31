/**
 * 
 * 
 * 
 */

// fetching entities such as Nationalite
fetchEntities("Nationalite");

function fetchEntities(className){
    var route = site_url+"/"+className;
    console.log(route);

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
    var route = site_url+"/add/Fugitif";
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
        "id": 0,
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
                "id": 0,
                "reference": null,
                "execute": false,
                "infractions": form.find("[name='infractions']").val(),
                "chambres": form.find("[name='chambres']").val(),
                "juridictions": form.find("[name='juridictions']").val(),
                "typeMandat": {
                    "id": 0,
                    "libelle": form.find("[name='typemandat']").val()
                },
                "dateEmission": "1899-12-30T00:00:00+00:13"
            }
        ],
        "listeNationalites": [
            {
                "id": 0,
                "nationalite": {
                    "id": 0,
                    "libelle": form.find("[name='nationalite']").val()
                },
                "principale": true
            }
        ]
    };
    // console.log(jsonString);
    return jsonObject;
}