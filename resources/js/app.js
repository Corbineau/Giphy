var topics = ["this", "own goal", "shade", "yis"];
var gifLimit = 10;

function displayGifs() {
    
    if ($("#gifLimit-input").val() === "") { //did this to make sure that this only goes off if there's a value here.
        $("#gif-view").html("<p>Please enter a number of gifs you'd like to pull.</p>");
        console.log("no limit!")
    } else {
        $("#gif-view").empty();
        gifLimit = $("#gifLimit-input").val();
        console.log(gifLimit);
        var meme = $(this).attr("data-name")
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
                console.log(showgifs);
                let rated = $("<p>");
                rated.text(rating);
                console.log(fwsurl);
                let imgBox = $(`<img src="${fwsurl}" alt="${rating}" />`);
                console.log(imgBox);
                let movImgBox = ($(`<img src="${fwurl}" alt="${rating}" />`));
                imgBox.addClass("meme");
                imgBox.append(rated);
                showgifs.append(imgBox);
                console.log(showgifs);
                $("#gif-view").append(showgifs);
            }
        })
    }
};





// Function for displaying gifs data
function renderButtons() {

    // Deleting the old gifs prior to adding new gifss
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of gifss
    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generating buttons for each gifs in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var btn = $("<button>");
        // Adding a class
        btn.addClass("gifs");
        // Added a data-attribute
        btn.attr("data-name", topics[i]);
        // Provided the initial button text
        btn.text(topics[i]);
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


$(document).on("click", ".gifs", displayGifs);

// Calling the renderButtons function to display the intial buttons
renderButtons();