function shorten(e){
	
	// Prevent the form from submitting data - we need to send it to our own API!
	e.preventDefault(); 
	// Get data from the form
	var url = document.querySelector("#url").value;
	var key = document.querySelector("#key").value;
	// Generate a random path, if none is present
	if(key == ""){
		key = Math.random().toString(36).substr(2, 5);
	}
	// Send the request to our API
	fetch(`/shorten?url=${url}&key=${key}`);
	// Display the shortened link
	document.querySelector("h4").innerHTML = `Shortened at 👉 <a href="/${key}">/${key}</a>`;
}