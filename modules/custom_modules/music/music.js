/* global Module */

/* Magic Mirror
 * Module: HelloWorld
 * 
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */

 Module.register("music",{
	// Default module config.
	defaults: {
		text: "MusicModule",
		models: [
					{
						file: "./snowboy/pmdl/Look_at_me.pmdl",
						message: "Look at me"
					},
					{
						file: "./snowboy/pmdl/Toothbrush_Song.pmdl",
						message: "Hooked on a feeling"
					},
					{
						file: "./snowboy/pmdl/PandaPandaPandaPanda.pmdl",
						message: "I got broads in Atlanta"
					}
		]
	},

	start: function() {
		console.log("----------main file sent socket---------")
		this.sendSocketNotification("snowboy", this.config);

	},

	socketNotificationReceived: function(notification, payload){
		if (notification === "KEYWORD_SPOTTED"){
			console.log("PAYLOAD", payload);
			console.log("PAYLOAD MESSAGE", payload.message)
			this.sendNotification(payload.message);
		}
	},

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
		wrapper.innerHTML = this.config.text;
		return wrapper;
	}
});
