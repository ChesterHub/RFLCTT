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

		var params = ['./snowboy/music.py'];

		models.forEach(function(model) {
			params.push(model.file);
		}, this);

		// var runCommand = spawn(params.join(" "));
		var runCommand = spawn('python', params, { detached: false });

		// self.sendSocketNotification("sentback", youDidIt);
		runCommand.stderr.on('data', function (data) {
			var message = data.toString();
			console.log("Seeing if voice command detected...");
			if (message.startsWith('INFO')) {
				console.log("Voice Command Detected");
				var items = message.split(':');
				var index = parseInt(items[2].split(' ')[1]);
				var model = models[index - 1];
				self.sendSocketNotification("KEYWORD_SPOTTED", model);

			} else {
				console.error(message);
			}
		})


		runCommand.stdout.on('data', (data) => {
			console.log(`stdout: ${data}`);
		});

	}
})