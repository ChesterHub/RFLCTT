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
						file: "./snowboy/pmdl/Log_me_out.pmdl",
						message: "You DID IT"
					},
					{
						file: "./snowboy/pmdl/PandaPandaPandaPanda.pmdl",
						message: "You DID IT"
					}
		]
	},

	start: function() {
		console.log("----------main file sent socket---------")
		this.sendSocketNotification("snowboy", this.config);
	},

	socketNotificationReceived: function(notification, payload){
		if (notification === "KEYWORD_SPOTTED"){
			console.log(payload);
			this.sendNotification(payload.message, {type: "notification"});
		}
	},

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
		wrapper.innerHTML = this.config.text;
		return wrapper;
	}
});
