var topics = ["this", "own goal", "shade", "yis"];

      function displayMovieInfo() {

            var meme = $(this).attr("data-name")
            var queryURL = `https://api.giphy.com/v1/gifs/search?q=${meme}&api_key=1ow0eSpQvrKQ1nQarYqdvaURC99YYscY`;

            // Creates AJAX call for the button being clicked
            $.ajax({
              url: queryURL,
              method: "GET"
            }).then(function(response) {
              console.log(response);
              var showgifs = $("<div>"); 
                const {Title: title, Rated: rated, Released: released, Plot: plot, Poster: poster} = response;

                showgifs.addClass("gifsInfo");
                const rate = $("<span>");
                  rate.text(rated);
                const releaseDate = $("<span>");
                  releaseDate.text(released);
                const plotView = $("<p>");
                  plotView.text(plot);
                const gifsPoster = ($(`<img src="${poster}" alt="${title} gifs poster" />`));
                // //let ratings = response.Ratings.forEach(function(rating) {
                //   ratingString = JSON.stringify(rating);
                //   showgifs.append($(`<span> ${ratingString} </span>`))});
                showgifs.append(rate, releaseDate, plotView, gifsPoster);
                //showgifs.append(releaseDate)
                //showgifs.append(plot)
                //.append(poster);
                console.log(showgifs);
                //$("#gifs-view").prepend(showgifs);
                $("#gifs-view").prepend(showgifs);

            });

            }

      // Generic function for capturing the gifs name from the data-attribute
      //function alertgifsName() {
        //var gifsName = $(this).attr("data-name");
        //console.log(gifsName);
        //}



      // Function for displaying gifs data
      function renderButtons() {

        // Deleting the gifss prior to adding new gifss
        // (this is necessary otherwise we will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of gifss
        for (var i = 0; i < gifss.length; i++) {

          // Then dynamicaly generating buttons for each gifs in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var btn = $("<button>");
          // Adding a class
          btn.addClass("gifs");
          // Added a data-attribute
          btn.attr("data-name", gifss[i]);
          // Provided the initial button text
          btn.text(gifss[i]);
          // Added the button to the HTML
          $("#buttons-view").append(btn);
        }
      }

      // This function handles events where one button is clicked
      $("#add-gifs").on("click", function(event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var gifs = $("#gifs-input").val().trim();

        // The gifs from the textbox is then added to our array
        gifss.push(gifs);

        // Calling renderButtons which handles the processing of our gifs array
        renderButtons();
        $("#gifs-input").val("");
      });

      // Function for displaying the gifs inf
        // We're adding a click event listener to all elements with the class "gifs"
          // We're adding the event listener to the document itself because it will
      // work for dynamically generated elements


      $(document).on("click", ".gifs", displayMovieInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();