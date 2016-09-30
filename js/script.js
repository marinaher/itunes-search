$(document).ready(function() {

	//Click Event
    $( "#searchButton").click( function(){
    	search();
    });

    // "ENTER" key press event
    $( "input" ).keypress( function(){
	    if (event.which == 13 || event.keyCode == 13) {
	    	search();
	    }
	});

    // Search
    var search = function(){
        var userInput = $("#searchField").val();
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            url: "https://itunes.apple.com/search?term=" + userInput + "&limit=25",
            success: function(data) {
                $("#searchField").val("");
        		// console.log(data);
                showOnPage(data, userInput);
            }
        });
    }

    // Render Elements
    var showOnPage = function(data, userInput) {
        var songInfoItems = createListItems(data);

        // Show/Hide DOM
        $("#resultsLabel").fadeIn(200);
        $("#resultsCount").text("");
        $("#resultsCount").text(data.resultCount + " results for \"" + userInput + "\".");
        $("#searchResultsList").empty();
        $("#searchResultsList").fadeIn(200);

        // Render
        $('#searchResultsList').html(songInfoItems);
    }

    // Loop and Create elements
    var createListItems = function(data){
    	var dataItems = data.results;
        var songInfoItems = '';

    	for (var i = 0; i < dataItems.length; i++) {
            var item = dataItems[i];
            var songInfo = {
                source: 0,
                artwork_url: item.artworkUrl100,
                track_name: item.trackCensoredName,
                artist_name: item.artistName,
                collection_name: item.collectionCensoredName,
                genre: item.primaryGenreName,
                release_date: item.releaseDate,
                preview_url: item.previewUrl
            };

            dataItems[i] = songInfo;
            songInfoItems += '<li class="songListItem">';
            songInfoItems += '<img class="artWork" src=' + songInfo.artwork_url + '/>';
            songInfoItems += '<p><video controls="" height="40" width="100%" name="media"><source src="' + songInfo.preview_url + '"type="audio/mp4"></video></p>';
            songInfoItems += '<h4 class="songTrackName">' + songInfo.track_name + '</h4>';
            songInfoItems += '<h5 class="artistname">' + songInfo.artist_name + '</h5>';
            songInfoItems += '<p class="collenctionName">' + songInfo.collection_name + '</p>';
            songInfoItems += '<p class="genre"><small>' + songInfo.genre + '</small></p>';

            songInfoItems += "</li>";
        }

        return songInfoItems;
    }

});