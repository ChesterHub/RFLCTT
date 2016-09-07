var NodeHelper = require("node_helper");

module.exports = NodeHelper.create({
	// Subclass start method.
	start: function() {
		console.log("Starting module: " + this.name);
		this.fetchers = [];
	},

	test: function() {
		alert("THIS IS A TEST OF THE PUBLIC BROADCAST SYSTEM")
	},

	// Subclass socketNotificationReceived received.
	socketNotificationReceived: function(notification, payload) {
		if (notification === "Look at me") {
			console.log("INSIDE LOOK AT ME SOCKET NOTIFICATION RECIEVED")
		this.sendSocketNotification("SHIT", {name: "Sean"});
		}
	}
})