var topics = ["this", "own goal", "shade", "yis"];
var gifLimit = 10;

      function displayGifs() {

            if($("#gifLimit-input").val() = "") {
                return gifLimit;
            } else {
                gifLimit = $("#gifLimit-input").val();
            }
            var meme = $(this).attr("data-name")
            var queryURL = `https://api.giphy.com/v1/gifs/search?q=${meme}&limit=${gifLimit}&api_key=1ow0eSpQvrKQ1nQarYqdvaURC99YYscY`;

            // Creates AJAX call for the button being clicked
            $.ajax({
              url: queryURL,
              method: "GET"
            }).then(function(response) {
              console.log(response);
              var showgifs = $("<div>"); 
                const {q: q, rating: rating } = response;

                showgifs.addClass("gifsInfo");
                const rated = $("<span>");
                  rated.text(rating);
                const query = $("<span>");
                  query.text(q);
                // const imgLimit = $("<p>");
                //   imgLimit.text(limit);
                showgifs.append(rate, query, imgLimit, gifsPoster);
                //showgifs.append(query)
                //showgifs.append(plot)
                //.append(poster);
                console.log(showgifs);
                $("#gifs-view").prepend(showgifs);

            });

            }



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
          btn.attr("data-name",topics[i]);
          // Provided the initial button text
          btn.text(topics[i]);
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
       topics.push(gifs);

        // Calling renderButtons which handles the processing of our gifs array
        renderButtons();
        $("#gifs-input").val("");
      });

      // Function for displaying the gifs inf
        // We're adding a click event listener to all elements with the class "gifs"
          // We're adding the event listener to the document itself because it will
      // work for dynamically generated elements


      $(document).on("click", ".gifs", displayGifs);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();