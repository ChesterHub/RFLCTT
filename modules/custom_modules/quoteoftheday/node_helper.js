var NodeHelper = require("node_helper");
var validUrl = require("valid-url");
var http = require("http");


module.exports = NodeHelper.create({

  start: function() {
    console.log("Starting module: " + this.name);

  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === "VERBA_SENT") {
      this.generateQuote();
      return;
    }
  },

  generateQuote: function() {
    var options =  {
      hostname: "quotes.rest",
      path: "/qod.json",
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    };
    var quoteArray = [];
    console.log("Quotes inbound");
    var req = http.request(options, (res) => {
      res.setEncoding('utf8');
      res.on('data', (quoteData) => {
        var contents = JSON.parse(quoteData).contents.quotes[0];
        var quote = contents.quote;
        var author = contents.author;
        var quoteObject = {
          quote: quote,
          author: author
        };

        quoteArray.push(quoteObject);

        this.sendSocketNotification("GOT_YER_QUOTE", quoteArray);
      });

    });
    req.end();
  }

// End of module
});
