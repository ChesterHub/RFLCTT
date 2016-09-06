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

		var params = ['./snowboy/test.py'];

		models.forEach(function(model) {
			params.push(model.file);
		}, this);

		// var runCommand = spawn(params.join(" "));
		var runCommand = spawn('python', params, { detached: false });
		var youDidIt = "YOU FUCKING DID IT"
		runCommand.stdout.on('data', (data) => {
			console.log(`stdout: ${data}`);
		});

		self.sendSocketNotification("sentback", youDidIt);



	}
})