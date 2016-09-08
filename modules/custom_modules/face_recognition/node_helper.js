var NodeHelper = require("node_helper");

var rest = require('rest');

module.exports = NodeHelper.create({

	start: function(){
		console.log("starting module" + this.name);
	},

	socketNotificationReceived: function(notification, payload) {
		if (notification === "PHOTO_SENT") {
			this.kairosRecognize(payload.photoData, "rflct", this.myDetectCallback, { "selector" : "FULL"});
			return;
		}
	},

	kairosRecognize: function(image_data, gallery_id, callback, options) {
		var self = this
		console.log("INSIDE THE kairos RECOGNIZE FUNCTION");

		var url = 'https://api.kairos.com/recognize';

		var data = { 'image': image_data, 'gallery_name': gallery_id };

		var header_settings = {
			"Content-Type": "application/json", 
			"app_id": "5ed82fff", 
			"app_key": "8e72e625273c34a1b427d4a9b8a42ecf"
		};

		rest({
			path: url,
			headers: header_settings,
			method: 'POST',
			entity: JSON.stringify(data)
		}).then(
			function(success) {
				console.log("*********************************************************");
				console.log(success)
				var name = success.entity.split("subject")[1].split(',')[0].slice(3, -1)
				console.log(name);
				self.sendSocketNotification("SHIT", {name: name})
				
			},
			function(error) {
				console.log("ERROR", error);
			}
		);

	},


	myDetectCallback: function(response) {
		console.log("response", response);

	}

// End of module
});