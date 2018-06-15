$(document).ready(function() {
    var topicArray = ["Step Brothers", "Talladega Nights", "The Other Guys", "Ace Ventura", "Anchorman", "Monty Python and the Holy Grail", "The Hangover", "Dumb and Dumber", "Superbad", "The Big Lebowski", "Happy Gilmore", "Billy Madison", "National Lampoon's Christmas Vacation", "Old School", "Wedding Crashers", "Elf", "Liar Liar"];

    function renderButtons() {
        for (var i = 0; i < topicArray.length; i++) {
            var buttons = $("<button>");
            buttons.addClass("topic");
            buttons.attr("data-name", topicArray[i]);
            buttons.text(topicArray[i]);
            $("#GIF_buttons").append(buttons);
        }
    };

    $("#add_topic").on("click", function() {
        event.preventDefault();
        var newTopic = $("#new_input").val().trim();
        topicArray.push(newTopic);
        console.log(topicArray);
        $("#GIF_buttons").empty();

        renderButtons();

    })
    renderButtons();
    console.log(topicArray);

    $("button").on("click", function () {
        var searchTerm = $(this).attr("data-name");
        var queryUrl = "http://api.giphy.com/v1/gifs/search?&q=" + searchTerm + "&data-state&fixed-width&api_key=HsILbNBiwIj8WB0BAZ9H7wmfo4SO0Zq1";
        $("#GIF_area").html("");

        $.ajax({
            url: queryUrl,
            method: "GET",
        }).then(function(response) {
            console.log(response);

            var results = response.data;

            for (var i = 0; i < 10; i++) {
                var topicDiv = $("<div>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                var topicImage = $("<img>");

                topicImage.attr("src", results[i].images.original_still.url);
                topicImage.attr("data-still", results[i].images.original_still.url);
                topicImage.attr("data-animate", results[i].images.original.url);
                topicImage.attr("data-state", "still");
                topicImage.addClass("gif");

                topicDiv.append(topicImage);
                topicDiv.append(p);

                $("#GIF_area").prepend(topicDiv);
            };
        });

        $(".gif").on("click", function() {
            var state = $(this).attr("data-state");
            console.log(state);

            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        })

    });






})