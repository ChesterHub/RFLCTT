/* Magic Mirror Config Sample
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */

var config = {
	port: 8080,

	language: 'en',
	timeFormat: 12,
	units: 'imperial',

	modules: [
		{
			module: 'alert'
		},
		{
			module: 'custom_modules/music',
			position: 'bottom_bar',
			classes: 'Kevin Chester Sean Ken'
		},
		{
			module: 'custom_modules/alexa',
			position: 'bottom'
		},
		{
			module: 'clock',
			position: 'top_left',
			classes: 'Kevin Sean Chester'
		},
		{
			module: 'calendar',
			header: 'US Holidays',
			position: 'top_left',
			classes: 'Sean',
			config: {
				calendars: [
					{
						symbol: 'calendar-check-o ',
						url: 'webcal://www.calendarlabs.com/templates/ical/US-Holidays.ics'
					}
				]
			}
		},
		{
			module: 'compliments',
			position: 'lower_third'
		},
		{
			module: 'currentweather',
			position: 'top_right',
			classes: 'Ken Sean Chester',
			config: {
				location: 'New York',
				locationID: '',  //ID from http://www.openweathermap.org
				appid: 'YOUR_OPENWEATHER_API_KEY'
			}
		},
		{
			module: 'weatherforecast',
			classes: 'Sean',
			position: 'top_right',
			header: 'Weather Forecast',
			config: {
	            location: 'New York',
							locationID: '5128581',  //ID from http://www.openweathermap.org
	            appid: 'YOUR_OPENWEATHER_API_KEY'
			}
		},
		{
			module: 'newsfeed',
			position: 'bottom_bar',
			classes: 'Ken',
			config: {
				feeds: [
					{
						title: "New York Times",
						url: "http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml"
					}
				],
				showSourceTitle: true,
				showPublishDate: true
			}
		},
		{
			module: "custom_modules/login",
			position: "lower_third",
			classes: "Sean Kevin"
		},
		{
			module: 'custom_modules/face_recognition'
  	},
  	{
  		module: 'custom_modules/bbcnews',
  		position: 'bottom_bar',
  		classes: 'Sean'
  	},
  	// {
  	// 	module: 'custom_modules/quoteoftheday',
  	// 	position: 'lower_third',
  	// 	classes: 'Kevin Sean'
  	// },
  	{
  		module: 'custom_modules/redditworldnews',
  		position: 'bottom_bar',
  		classes: 'Kevin Chester'
  	}

	]

};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== 'undefined') {module.exports = config;}
