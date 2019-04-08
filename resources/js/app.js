var topics = ["this", "own goal", "shade", "yis"];
var gifLimit = 10;

function checkLimit() {
    if ($("#gifLimit-input").val() === "") { //did this to make sure that this only goes off if there's a value here.
    var meme = $(this).attr("data-name")
    displayGifs(gifLimit, meme);
    } else {
        gifLimit = $("#gifLimit-input").val();
        $("#gifLimit-input").val("");
        var meme = $(this).attr("data-name")
        displayGifs(gifLimit, meme);
    };
    
};


function displayGifs(gifLimit, meme) {
    $("#gif-view").empty();
    console.log(meme);
    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${meme}&limit=${gifLimit}&api_key=1ow0eSpQvrKQ1nQarYqdvaURC99YYscY`;
    // Creates AJAX call for the button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        for (let i = 0; i < response.data.length; i++) {
            let repObject = response.data[i];
            let fwsurl = repObject.images.fixed_width_still.url;
            let fwurl = repObject.images.fixed_width.url;
            let rating = repObject.rating;
            let showgifs = $("<span>");
            showgifs.addClass("gifsInfo");
            let rated = $("<p>");
            rated.addClass("rating");
            rated.text(`rating: ${rating}`);
            let imgBox = $(`<img src="${fwsurl}" alt="${rating}" />`);
            imgBox.attr("data-src", fwurl);
            imgBox.addClass("meme");
            showgifs.append(imgBox);
            showgifs.append(rated);
            $("#gif-view").append(showgifs);
            }
        }
    );
}








function renderButtons() {

    // Deleting the old buttons!
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of topics
    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generating buttons for each topic in the array
        var btn = $("<button>");
        // Adding a class
        btn.addClass("gifs");
        // data-attribute same as the name of the button
        btn.attr("data-name", topics[i]);
        // Provided the initial button text
        btn.text(topics[i]);
        console.log(btn.attr("data-name"));
        // Added the button to the HTML
        $("#buttons-view").append(btn);
    }
}

// This function handles events where one button is clicked
$("#add-gifs").on("click", function (event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var gifs = $("#gifs-input").val().trim();
    if (gifs) { //did this so it won't add a blank box if the field is blank.
        // The gifs from the textbox is then added to our array
        topics.push(gifs);

        // Calling renderButtons which handles the processing of our gifs array
        renderButtons();
        $("#gifs-input").val("");
    }
});

// Function for displaying the gifs inf
// We're adding a click event listener to all elements with the class "gifs"
// We're adding the event listener to the document itself because it will
// work for dynamically generated elements


$(document).on("click", ".gifs", checkLimit);


$(document).on("click", ".meme", function () {
    let tempA = $(this).attr("src");
    let tempB = $(this).attr("data-src");
    console.log(tempA, tempB);
    $(this).attr("src", tempB).attr("data-src", tempA);
});


// Calling the renderButtons function to display the intial buttons
renderButtons();