$(document).ready(function () {
	//Array of Topics to use for Buttons
	var topics = ["poodle", "pomeranian", "golden retriever", "chihuahua", "german shepard", "maltese", "collie", "dalmation", "beagle", "dobermann", "akita"]

	function displayTopicInfo() {
		var dogBreeds = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=HBkIDuDrdJM8V0nTkA1SXAfs8a6jGP9q&q=" + dogBreeds +"&limit=10&offset=0&rating=G&lang=en";

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function (response) {
			//sets the Length for the next loop
			var results = response.data;
			//Clear Previous images
			$("#dogs").empty();
			// Create For Loop here to show multiple Giphy Responses
			for (var i = 0; i < results.length; i++) {

				//Creating a Div for Topic
				var topicDiv = $("<div class='breeds'>");
				// Storing the rating data in variable
				var rating = response.data[i].rating;
				// Creating Element to display rating 
				var pRate = $("<p>").text("Rating: " + rating);
				// Adding Rating to Topic Div
				topicDiv.append(pRate);
				// Variable to hold still image from from Giphy
				var giphyImgStill = response.data[i].images.downsized_still.url;
				// Variable to hold motion image from Giphy
				var giphyImgMotion = response.data[i].images.downsized.url;
				// Create Image Element
				var image = $("<img>").attr("src", giphyImgStill);
				//update image with more attributes
				image.attr("data-still", giphyImgStill);
				image.attr("data-animate", giphyImgMotion);
				image.attr("data-state", "still");
				image.attr("id", "img" + i)
				//Give images a class
				image.addClass("giphyImages");
				// Appending the Image
				topicDiv.prepend(image);
				// Write Topic Div to HTML document
				$("#dogs").prepend(topicDiv);
			}
		})
	}


	function renderButtons() {
		// Clears DogButtons Div
		$("#dogButtons").empty();

		// Looping through topics
		for (var i = 0; i < topics.length; i++) {
			// Code to Dynamically Generate Buttons for each Topic in topics array
			var a = $("<button>");
			// Adding a class of Topic to our Button
			a.addClass("topic");
			// Adding a class for styling
			a.addClass("btn btn-lg");
			// Adding a data-attribute
			a.attr("data-name", topics[i]);
			// adding attr for Bootstrap
			a.attr("type", "button");
			// Button Text
			a.text(topics[i]);
			// Adding the Button to the Buttons Div
			$("#dogButtons").append(a);
		}
	}

	// This function handles events where a Topic button is clicked
	$("#addBreed").on("click", function (event) {
		event.preventDefault();
		// This line grabs the input from the textbox
		var topic = $("#dog-input").val().trim();
		// Adding movie from the textbox to our array
		topics.push(topic);
		// Clear the form field for next addition
		$("form").trigger("reset")
		// Calling renderButtons which handles the processing of our movie array
		renderButtons();
	});

	// Adding a click event listener to all elements with a class of "topic"
	$(document).on("click", ".topic", displayTopicInfo);
	// Calling the renderButtons function to display the intial buttons
	renderButtons();



	// Add a listener for all elements with class of "gif"
	$(document).on("click", ".giphyImages", flipAnimate);



	function flipAnimate() {
		var item = $(this).attr("id");
		item = "#" + item;
		// console.log(item);
		var state = $(item).attr("data-state");
		// console.log(state);
		if (state === "still") {
			$(item).attr("src", $(item).attr("data-animate"));
			$(item).attr("data-state", "animate");
			// console.log(this);
		} else {
			$(item).attr("src", $(item).attr("data-still"));
			$(item).attr("data-state", "still");
			// console.log(this);
		};
	};
})

