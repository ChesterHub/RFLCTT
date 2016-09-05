const NodeHelper = require('node_helper');
const spawn = require('child_process').spawn;

module.exports = NodeHelper.create({
	start: function() {

	},

	socketNotificationReceived: function(notification, payload) {
		if (notification === "snowboy") {
			console.log("----------node helper received socket---------")
			this.activateSnowboy(payload);
			return;
		}
	},

	activateSnowboy: function(config) {
		var models = config.models;
		var self = this;

		var params = ['./snowboy/mirror.py'];

		models.forEach(function(model) {
			params.push(model.file);
		}, this);

		console.log(params);

		self.sendSocketNotification("sentback", params);



	}
})