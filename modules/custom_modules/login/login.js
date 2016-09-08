Module.register("login", {

	start: function() {
		Log.log("Starting module: " + this.name);
		// this.sendSocketNotification("FUCK", {});
		// current user
		// this.current_user = null;
	},

	notificationReceived: function(notification, payload, sender) {
		if (notification === "Begin Login") {
			console.log("INSIDE THE LOGIN FUNCTION")
			console.log("PAYLOAD EQUALS ", payload.name)
			this.login_user(payload.name)
		}
	},

	login_user: function (name) {
		console.log("INSIDE LOGINUSER FUNCTION WHERE NAME EQUALS", name)
		MM.getModules().exceptWithClass(name).enumerate(function(module) {
			module.hide(-1, function() {
				Log.log(module.name + ' is hidden.');
			});
		});
	}

})	