/* global Module */

/* Magic Mirror
 * Module: HelloWorld
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */

 Module.register("helloworld",{
	// Default module config.
	defaults: {
		text: "Bears are cool",
		models: [
					// {file: "./snowboy/resources/snowboy.umdl"},
					{file: "./snowboy/Alexa.pmdl"}
		]
	},

	start: function() {
		console.log("----------main file sent socket---------")
		this.sendSocketNotification("snowboy", this.config);
	},

	socketNotificationReceived: function(notification, payload){
		if (notification === "sentback"){
			console.log(payload);
		}
	},
	

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
		wrapper.innerHTML = this.config.text;
		return wrapper;
	}
});
