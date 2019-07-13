    // init func and vars
    $(function() {
            makeButtonsVar(firstArray, "newButton", "#buttonSpot");
            console.log("we're connected!");
        })
        // make vars and arrays
    var firstArray = ["Slenderman", "Blair witch", "Morticia", "Elvira", "Uncle Fester"];
    // func for making buttons
    function makeButtonsVar(firstArray, gottaAddaClass, gifSpotFill) {
        // the empty is to clear for next search and prevent copies of old buttons
        $(gifSpotFill).empty();
        for (var i = 0; i < firstArray.length; i++) {
            var tempVar = $("<button>");
            tempVar.addClass(gottaAddaClass);
            tempVar.attr("data-type", firstArray[i]);
            tempVar.text(firstArray[i]);
            $(gifSpotFill).append(tempVar);
        }
    }

    $(document).on("click", ".newButton", function() {
            var type = $(this).data("type");
            console.log(type);
            var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=QOsbjYFwAv2iaNaB20WkDVJv60v5Dkm9&limit=12&rating=R";

            // ajax call for response
            $.ajax({ url: giphyURL, method: "GET" })
                .done(function(response) {

                    // check for response
                    console.log(response);

                    for (var i = 0; i < response.data.length; i++) {

                        var respVar = $('<div class="search-item">');
                        var rating = response.data[i].rating;
                        var p = $("<p>").text("Rating: " + rating);
                        var animated = response.data[i].images.original.url;
                        var still = response.data[i].images.original_still.url;
                        var image = $("<img>");

                        image.attr("src", still);
                        image.attr("data-still", still);
                        image.attr("data-animated", animated);
                        image.attr("data-state", "still");

                        image.addClass("aniStillmage");

                        respVar.prepend(p);
                        respVar.prepend(image);
                        $("#gifSpot").prepend(respVar);

                    }
                })
        })
        // having problems animating-still VV
    $(document).on("click", "aniStillmage", function() {
            var state = $(this).data("state");
            if (state == "still") {
                $(this).attr("src", $(this).data("animated"));
                $(this).attr("data-state", "animated");
            } else {
                $(this).attr("src", $(this).data("still"));
                $(this).attr("data-state", "still");

                // not working here ∆∆
                // console.log("state");
                // console.log(state);

            }
        })
        // the eq 0 is to prevent input from corruption
    $("#newGifs").on("click", function() {
        var nSearchVar = $("input").eq(0).val();
        firstArray.push(nSearchVar);
        makeButtonsVar(firstArray, "newButton", "#buttonSpot");
        return false;
    })