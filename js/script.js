$(document).ready(function() {

    $("#searchButton").click(function() {

        var userInput = $("#searchField").val();

        $.ajax({
            type: "GET",
            dataType: "jsonp",
            url: "https://itunes.apple.com/search?term=" + userInput + "&limit=25",
            success: function(data) {
                // displayDataResults(data);
                $("#searchField").val("");
        		console.log(data);
                showOnPage(data, userInput);
            }
        });
    });

    var showOnPage = function(data, userInput) {
        var dataItems = data.results;
        var items = '';
        $("#resultsLabel").fadeIn(200);
        $("#resultsCount").text("");
        $("#resultsCount").text(data.resultCount + " results for " + userInput + ".");
        $("#searchResultsList").empty();
        $("#searchResultsList").fadeIn(200);


        // dataItems.forEach(function(arrayElement) {
        // 	$("#displaySearchResults").text(arrayElement);
        //    console.log(arrayElement.collectionName);
        // });

        for (var i = 0; i < dataItems.length; i++) {
            // var listItem = "<li>" + dataItems[i].collection_name + "</li>";
            var item = dataItems[i];
            // console.log(item.artworkUrl100);
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

            console.log(songInfo.artwork_url);

            dataItems[i] = songInfo;
            items += "<img src=" + songInfo.artwork_url + "/>" + '<br>';
            items += '<h4>' + songInfo.track_name + '</h4><br>';
            items += songInfo.artist_name + '<br>';
            items += songInfo.collection_name + '<br>';
            items += songInfo.genre + '<br>';
            items += songInfo.preview_url + '<br><br>';

        }

        // var displayDataResults = function(data){
        //     var dataItems = data.results;
        //     var items = '';
        //     for (var i = 0; i < dataItems.length; i++) {
        //         var item = dataItems[i];
        //         var songInfo = {
        //             source: 0,
        //             artwork_url: item.artworkUrl1100,
        //             track_name: item.trackCensoredName,
        //             artist_name: item.artistName,
        //             collection_name: item.collectionCensoredName,
        //             genre: item.primaryGenreName,
        //             release_date: item.releaseDate,
        //             preview_url: item.previewUrl
        //         };

        //         dataItems[i] = songInfo;
        //         items += songInfo.artwork_url + '<br>';
        //         items += '<h4>' + songInfo.track_name + '</h4><br>';
        //         items += songInfo.artist_name + '<br>';
        //         items += songInfo.collection_name + '<br>';
        //         items += songInfo.genre + '<br>';
        //         items += songInfo.preview_url + '<br><br>';
        //     }
        $('#searchResultsList').html(items);
        // }

    }

});