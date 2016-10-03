$(document).ready(function() {

    var myData;
    var myUserInput;
    var startIndex = 0;
    var maxNumberPerPage = 10;

    //Click Event
    $("#searchButton").click(function() {
        search();
    });

    // "ENTER" key press event
    $("input").keypress(function() {
        if (event.which == 13 || event.keyCode == 13) {
            search();
        }
    });

    $('#showMore').click(function() {
    	showOnPage();
    });

    // Search
    var search = function() {
        var userInput = $("#searchField").val();
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            url: "https://itunes.apple.com/search?term=" + userInput + "&limit=50",
            success: function(data) {
                $("#searchField").val("");
                myData = data;
                // console.log(myData);
                myUserInput = userInput;
                showOnPage(userInput);
            }
        });
    }

    // Render Elements
    var showOnPage = function() {
        var songInfoItems = createListItems();

        // Show/Hide DOM
        $("#resultsLabel").fadeIn(200);
        $("#resultsCount").text("");
        $("#resultsCount").text(myData.resultCount + " results for \"" + myUserInput + "\".");
        $("#searchResultsList").empty();
        $("#searchResultsList").fadeIn(200);


        maxNumberPerPage += startIndex;

        // Render
        $('#searchResultsList').html(songInfoItems);

    }

    // Loop and Create elements
    var createListItems = function() {
        var dataItems = myData.results;
        var songInfoItems = '';

        if (maxNumberPerPage > dataItems.length) {
            maxNumberPerPage = dataItems.length;
        }

        for (startIndex; startIndex < maxNumberPerPage; startIndex++) {

            if (typeof dataItems[startIndex] !== "undefined") {

                var item = dataItems[startIndex];
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

                dataItems[startIndex] = songInfo;
                songInfoItems += '<li class="songListItem col-sm-6 col-md-3 flex-item">';
                songInfoItems += '<img class="artWork" src=' + songInfo.artwork_url.replace('100x100', '260x260') + '/>';
                songInfoItems += '<p><video controls="" height="40" width="100%" name="media"><source src="' + songInfo.preview_url + '"type="audio/mp4"></video></p>';
                songInfoItems += '<h4 class="songTrackName">' + songInfo.track_name + '</h4>';
                songInfoItems += '<h5 class="artistname">' + songInfo.artist_name + '</h5>';
                songInfoItems += '<p class="collenctionName">' + songInfo.collection_name + '</p>';
                songInfoItems += '<p class="genre"><small>' + songInfo.genre + '</small></p>';

                songInfoItems += "</li>";
            }
        }

        return songInfoItems;
    }

    //Check to see if the window is top if not then display button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 250) {
            $('.scrollToTop').fadeIn();
        } else {
            $('.scrollToTop').fadeOut();
        }
    });

    //Click event to scroll to top
    $('.scrollToTop').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 1000);
        return false;
    });
});
