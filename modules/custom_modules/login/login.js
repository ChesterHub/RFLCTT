Module.register("login", {

	start: function() {
		Log.log("Starting module: " + this.name);
		this.name = ""
	},

	notificationReceived: function(notification, payload, sender) {
		if (notification === "Begin Login") {
			console.log("INSIDE THE LOGIN FUNCTION")
			console.log("PAYLOAD EQUALS ", payload.name)
			this.name = payload.name;
			this.login_user(payload.name);
		}
	},

	login_user: function (name) {
		var self = this;
		console.log("INSIDE LOGINUSER FUNCTION WHERE NAME EQUALS", name)
		MM.getModules().exceptWithClass(name).enumerate(function(module) {
			module.hide(-1, function() {
				Log.log(module.name + ' is hidden.');
			});
			var p = new Promise(function(resolve, reject) {
				setTimeout(function(){console.log("PROMISES");}, 1);
				if(self.name){
					resolve(console.log("GREAT SUCCESS!"));
				} else {
					reject("FAILURE!");
				}
			});
			p.then(self.getDom(self.name));
		});
	},

	getDom: function(name) {
		var wrapper = document.createElement("div");
		console.log("Inside get dom", name)
		if(this.name) {
			console.log("Inside the second run through of getDom");
			var wrapper = document.getElementById("welcome-user");
			console.log(wrapper);
			wrapper.innerHTML = "Welcome, " + name + "!";
			return wrapper;
		} else {
			console.log("Nothing happened. This should only display once.");
			wrapper.id = "welcome-user";
			wrapper.innerHTML = "";
		}

		return wrapper;
	}

})	