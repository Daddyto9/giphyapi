// Testing that we're talking!
// alert("we're connected");

// I am digging this format (compliments of the sqeaky voice dude from the bootcamp videos)

// Array & variables
$(document).ready(function() {

    var myButtons = ["SlenderMan", "BlairWitch", "Morticia", "Elvira", "UncleFester"];

    function makeButtons(arrPop, classMaker, makeSpace) {
        $(makeSpace).empty();

        for (var i = 0; i < arrPop.length; i++) {

            var butn = $("<button>");
            butn.addClass(classMaker);
            butn.attr("data-type", arrPop[i]);
            butn.text(arrPop[i]);

            $(makeSpace).append(butn);
        }
    }

    // functions
    $(document).onabort("click", ".newButtons", function() {

        $("#images").empty();

        $(".newButtons").removeClass("active");
        $(this).addClass("active");

        var type = $(this).attr("data-type");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=QOsbjYFwAv2iaNaB20WkDVJv60v5Dkm9&limit=10";

        // Ajax
        $.ajax({
            url: queryURL,
            method: "GET"
        })

        .then(function(response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                var newDivPics = $("<div class=\"newPics\">");

                var ratings = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var animated = results[i].images.fixed_height.url;
                var still = results[i].images.fixed_height_still.url;

                var pics = $("<img>");
                pics.attr("src", still);
                pics.attr("data-still", still);
                pics.attr("data-animate", animated);
                pics.attr("data-state", still);
                pics.addClass("pics");

                gifDiv.prepend(p);
                gifDiv.prepend(pics);

                $("#images").append(gifDiv);

            }
        });

    });

    // change state
    $(document).on("click", ".pics", function() {
        var state = $(this).attr("data-state")

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    // not sure about this, this was "advice" from my prog homie Gil
    $("#add-flix").on("click", function(event) {
        event.preventDefault();
        var newSub = $("input").eq(0).val();

        if (newSub.length > 2) {
            myButtons.push(newSub);
        }

        makeButtons(myButtons, "newButtons", "#contRow");

    });
    makeButtons(myButtons, "newButtons", "#contRow");

});