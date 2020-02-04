/**
 * 
 * 
 * 
 */

var currentItemId = 0;

function fetchData(field, value){

    var route = site_url+"/api/search?field="+field+"&q="+value;
    console.log(route);
    
    performAjaxRequest(route, "GET", "json", "", onDataFetchSuccess, onDataFetchFailure, onDataFetchCompletion);
}

function onDataFetchSuccess(response, status){
    displayData(response, status);
}

function onDataFetchFailure(response, status, error){
    console.log("Failed to search data : ", response, status, error);
}

function onDataFetchCompletion(response, status){

}

function displayData(data, status){
    // console.log(data, status);

    $("table tbody").empty();
    data.forEach(element => {
        $("table tbody").append('<tr data-id = "'+element.id+'">\
                                    <th scope="row">'+element.nom+'</th>\
                                    <td>'+element.prenoms+'</td>\
                                    <td>'+element.mandats[0].infractions+'</td>\
                                    <td>'+element.mandats[0].juridictions+'</td>\
                                    <td>\
                                        <img class = "delete_menu_action" style = "cursor: pointer;" src = "./resources/img/Ionicons/delete_icon.png" alt = "" width = "" height = "" title = "Supprimer"/>\
                                        <a href = "data.html" style = "text-decoration:none;"><img class = "edit_menu_action" style = "cursor: pointer;" src = "./resources/img/Ionicons/edit_icon.png" alt = "" width = "" height = "" title = "Modifier"/></a>\
                                    </td>\
                                </tr>');
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

    var response = confirm("Voulez vous vraiment supprimer cet élément : "+ trTag.children().first().text());
    if (response == true){
        var itemId = trTag.attr("data-id");
        deleteItem(itemId);
    }
});

function deleteItem(id){

    var route = site_url+"/api/fugitif/"+id;
    // var data = "class=Fugitif&property=id&value="+id;

    currentItemId = id;
    
    performAjaxRequest(route, "DELETE", "json", "", onItemDeletionSuccess, onItemDeletionFailure, onItemDeletionCompletion);
}

function onItemDeletionSuccess(response, status){
    if (status == "success"){
        $("table tr[data-id='"+currentItemId+"']").remove();
        alert("Item deleted successfully");
    }
}

function onItemDeletionFailure(response, status, error){
    console.log("Failed to delete item", response, status, error);

}

function onItemDeletionCompletion(response, status){
    console.log("request completed");
}