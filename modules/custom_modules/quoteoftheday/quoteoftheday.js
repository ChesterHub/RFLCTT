Module.register("quoteoftheday", {
  defaults: {
    language: config.language,
    apiBase: "quotes.rest",

  },

  start: function() {
    Log.info("Starting module: " + this.name);
    this.sendSocketNotification("VERBA_SENT", {});
    this.loaded = false;
    this.quoteArray = {};
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === "GOT_YER_QUOTE") {

      this.quoteArray = payload;

      console.log(this.quoteArray[0]);

      var p = new Promise(function(resolve, reject) {
        setTimeout(function(){console.log("PROMISES");}, 1);
        if(that.quoteArray[0]){
          resolve('Success!');
        } else {
          reject("FAIL!");
        }
      });
      p.then(this.getDom());
    }
  },

  getDom: function() {

    var wrapper = document.createElement("div");
    if (this.quoteArray[0]) {
      // Finds the wrapper div from the 1st getDom call
    var wrapper = document.getElementById("quote-container");
    console.log("Inside of the getDom function!");
    var quote = document.createElement("div");
    quote.className = "bright medium light";
    quote.innerHTML = this.quoteArray[0].quote;

    wrapper.appendChild(quote);

    var author = document.createElement("div");
    author.className = "small light";
    author.innerHTML = this.quoteArray[0].author;

    wrapper.appendChild(author);
    console.log(quote);
    console.log(author);
    console.log(wrapper);
    wrapper = (quote, author);


  } else {
    wrapper.id = "quote-container";
    wrapper.innerHTML = "";
  }
    return wrapper;
  }
});
