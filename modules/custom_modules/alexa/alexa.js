/* global Module */

/* Magic Mirror
 * Module: HelloWorld
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */

 Module.register("alexa",{
  // Default module config.
  defaults: {
    text: "AlexaReady!",
    models: [
          {
            file: "./snowboy/pmdl/Summon_Alexa.pmdl",
            message: "You DID IT"
          },
          {
            file: "./snowboy/pmdl/Go_to_sleep_Alexa.pmdl",
            message: "You DID IT"
          }
    ]
  },

  start: function() {
    console.log("----------main file sent socket---------")
    this.sendSocketNotification("summon", this.config);
  },

  // socketNotificationReceived: function(notification, payload){
  //   if (notification === "KEYWORD_SPOTTED"){
  //     console.log(payload);
  //     this.sendNotification(payload.message, {type: "notification"});
  //   }
  // },

  // Override dom generator.
  getDom: function() {
    var wrapper = document.createElement("div");
    wrapper.innerHTML = this.config.text;
    return wrapper;
  }
});
