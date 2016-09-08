 Module.register("face_recognition",{

	// Default module config.
	defaults: {
		
	},


	start: function(){
	},
//end of start

	getCamera: function() {
		var self = this;

		var width = 320;   
		var height = 240;
		this.video = document.getElementById('video');
		this.canvas = document.getElementById('canvas');
		console.log(this.canvas);
		
		navigator.getMedia = ( navigator.getUserMedia ||
		navigator.webkitGetUserMedia ||
		navigator.mozGetUserMedia ||
		navigator.msGetUserMedia);

		navigator.getMedia({
				video: true,
				audio: false
			},

		function(stream) {
			if (navigator.mozGetUserMedia) {
				video.mozSrcObject = stream;
			} else {
				var vendorURL = window.URL || window.webkitURL;
				video.src = vendorURL.createObjectURL(stream);
			}
			video.play();
			
			///turn off camera
			setTimeout(stopCamera, 10000);
			function stopCamera(){
				var track = stream.getTracks()[0];
				track.stop();	
			}
			///turn off camera
		},
		function(err) {
			console.log("An error occured! " + err);
		}
		);

		setTimeout(takePicture, 2000)

		function takePicture() {
			var context = canvas.getContext('2d');
			// console.log("Click");
			if (width && height) {
				canvas.width = width;
				canvas.height = height;
				context.drawImage(video, 0, 0, width, height);

				var data = canvas.toDataURL('image/png');
				
				
				image_data = data;
				image_data = image_data.replace("data:image/jpeg;base64,", "");
				image_data = image_data.replace("data:image/jpg;base64,", "");
				image_data = image_data.replace("data:image/png;base64,", "");
				image_data = image_data.replace("data:image/gif;base64,", "");
				image_data = image_data.replace("data:image/bmp;base64,", "");
				global_image_data = image_data;

				self.sendSocketNotification("PHOTO_SENT", {photoData: global_image_data});
				
			} else {
				console.log("else");    
			}	
		}
	},

	socketNotificationReceived: function(notification, payload) {
		if (notification === "SHIT") {
			console.log("OMG I RECEIVED A NOTIFICATION FROM FACE RECOG HELPER")
			console.log(payload.name)
			this.sendNotification("Begin Login", {name: payload.name})
		}
	},

	notificationReceived: function(notification) {
		if (notification === "ALL_MODULES_STARTED") {
			console.log("INSIDE NOTIFICATION RECEIVED TO TRIGGER FACIAL RECOG")
			this.getCamera()
		}
	},


	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
		wrapper.innerHTML = "";
		return wrapper;
	}
});
