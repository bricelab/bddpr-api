/**
 * 
 * 
 * 
 */

var currentItemId = 0;

function displayData(data, status){
    // console.log(data, status);

    $("table tbody").empty();
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
    var response = confirm("Voulez vous vraiment supprimer ce mandat id : "+itemId+" relatif à l'utilisateur : "+ trTag.children().first().text());
    if (response == true)
        deleteItem(itemId);
});

function deleteItem(id){

    var route = site_url+"/api/mandat/"+id;
    // var data = "class=Fugitif&property=id&value="+id;

    currentItemId = id;
    
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