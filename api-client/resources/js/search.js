/**
 * 
 * 
 * 
 */

var currentItemId = 0;

function displayData(data, status){
    // console.log(data, status);

    data.forEach(element => {

        element.mandats.forEach(mandat =>{
            if (mandat.archived == false){
                $("table tbody").append('<tr data-id = "'+mandat.id+'">\
                    <th scope="row">'+element.nom+'</th>\
                    <td>'+element.prenoms+'</td>\
                    <td>'+mandat.infractions+'</td>\
                    <td>'+mandat.juridictions+'</td>\
                    <td>\
                        <img class = "delete_menu_action" style = "cursor: pointer;" src = "./resources/img/Ionicons/delete_icon.png" alt = "" width = "" height = "" title = "Supprimer"/>\
                        <img class = "edit_menu_action" style = "cursor: pointer;" src = "./resources/img/Ionicons/edit_icon.png" alt = "" width = "" height = "" title = "Modifier" data-toggle="modal" data-target="#dataModal"/>\
                    </td>\
                </tr>');
            }
        });
    });
}

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

    $("input[name='nom']").val(object.nom);
    $("input[name='prenoms']").val(object.prenoms);
    $("input[name='nommarital']").val(object.prenoms);
    $("input[name='adresse']").val(object.adresse);
    $("input[name='alias']").val(object.alias);
    $("input[name='surnom']").val(object.surnom);
    $("input[name='lieunaissance']").val(object.lieuNaissance);
    $("input[name='datenaissance']").val(object.dateNaissance);
    $("input[name='taille']").val(object.taille);
    $("input[name='poids']").val(object.poids);
    $("input[name='prénoms']").val(object.prenoms);
    $("input[name='numerotelephone']").val(object.numeroTelephone);
    $("textarea[name='observations']").val(object.observations);
    $("input[name='numeropieceid']").val(object.numeroPieceId);
    $("input[name='infractions']").val(object.mandats.mandat.infractions);
    $("input[name='chambres']").val(object.mandats.mandat.chambres);
    $("input[name='juridictions']").val(object.mandats.mandat.juridictions);
    $("input[name='reference']").val(object.mandats.mandat.reference);

    $("[name='typemandat'] option").attr("selected", false);
    $("[name='typemandat']").find("option[value='"+object.mandats.mandat.typeMandat.libelle+"']").attr("selected", true);

    $("[name='execute'] option").attr("selected", false);
    $("[name='execute']").find("option[value='"+object.mandats.mandat.execute+"']").attr("selected", true);

    $("[name='sexe'] option").attr("selected", false);
    $("[name='sexe']").find("option[value='"+object.sexe+"']").attr("selected", true);

    if (object.listeNationalites.length){
        $("[name='nationalite'] option").attr("selected", false);
        $("[name='nationalite']").find("option[value='"+(object.listeNationalites[0]).nationalite.libelle+"']").attr("selected", true);
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