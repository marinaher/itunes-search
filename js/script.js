$(document).ready(function(){
$("#searchButton").click(function() {

    var userInput = $("#searchField").val();

    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: "https://itunes.apple.com/search?term=" + userInput + "&limit=25",
        success: function(data) {
            // Another function to loop and display
            console.log(data);
            $("#searchField").val("");
            showOnPage(data, userInput);
        }
    });
});


var showOnPage = function(data, userInput) {
    var dataArray = data.results;
    $("#resultsLabel").fadeIn(200);
    $("#resultsCount").text("");
    $("#resultsCount").text(data.resultCount + " results for " + userInput);
    dataArray.forEach(function(arrayElement) {
        console.log(/*arrayElement.collectionName*/);
    });
    /*for (var i = 0; i <= data.resultCount; i++) {
    	console.log(dataArray[i].collectionName);
    }*/
}

/*var handleSearchResults = function(data){
	var results = data.results;
	$('#displaySearchResults').fadeIn(200);
	$('#displaySearchResults').text("");
	for(var i = 0; i < data.resultsCount; i++){
		var item = results[i];
		var obj = {
			source = 0,
			artworkUrl100 = item.artworkUrl100,
			collectionName = item.collectionName,
			primaryGenreName = item.primaryGenreName,
			trackCount = item.trackCount,
			trackName = item.trackName,
			currency = item.currency
		}	
	}
}*/
});