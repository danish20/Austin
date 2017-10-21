
var Botkit = require('botkit');
var Forecast = require('forecast.io');
var options = {APIKey:process.env.FORECASTTOKEN};
var forecast = new Forecast(options);
var Main = require('../AustinBot/main');
var nock = require("nock");




//var childProcess = require("child_process");
var data = require("../AustinBot/mockData.json");
var controller = Botkit.slackbot({
  debug: false
  //include "log: false" to disable logging
  //or a "logLevel" integer from 0 to 7 to adjust logging verbosity
});

// connect the bot to a stream of messages
controller.spawn({
  token: process.env.SLACKTOKEN,
}).startRTM()


//BOT HOOKS
// give the bot something to listen for.
//controller.hears('string or regex',['direct_message','direct_mention','mention'],function(bot,message) {
controller.hears('setup sprint',['mention', 'direct_mention','direct_message'], function(bot,message) 
{
  //console.log(message);

  getResponse(function(w){

    bot.reply(message,w+"");

  });
 });
controller.hears('new sprint',['mention', 'direct_mention','direct_message'], function(bot,message) 
{
  console.log(message);
  getResponse(function(w){

    bot.reply(message,w);

  });
});

controller.hears('hello',['mention', 'direct_mention','direct_message'], function(bot,message) 
{
  var jsonData = {
    "attachments": [
        {
            "fallback": "Required plain-text summary of the attachment.",
            "color": "#36a64f",
            "pretext": "Optional text that appears above the attachment block",
            "author_name": "Bobby Tables",
            "author_link": "http://flickr.com/bobby/",
            "author_icon": "http://flickr.com/icons/bobby.jpg",
            "title": "Slack API Documentation",
            "title_link": "https://api.slack.com/",
            "text": "Optional text that appears within the attachment",
            "fields": [
                {
                    "title": "Priority",
                    "value": "High",
                    "short": false
                }
            ],
            "image_url": "http://my-website.com/path/to/image.jpg",
            "thumb_url": "http://example.com/path/to/thumb.png",
            "footer": "Slack API",
            "footer_icon": "https://platform.slack-edge.com/img/default_application_icon.png",
            "ts": 123456789
        }
    ]
};

var responseImage = {
  "attachments": [
      {
          "fallback": "Network traffic (kb/s): How does this look? @slack-ops - Sent by Julie Dodd - https://datadog.com/path/to/event",
          "title": "Network traffic (kb/s)",
          "title_link": "https://datadog.com/path/to/event",
          "text": "How does this look? @slack-ops - Sent by Julie Dodd",
          "image_url": "https://d30y9cdsu7xlg0.cloudfront.net/png/327992-200.png",
          "color": "#764FA5"
      }
  ]
};
  bot.reply(message,responseImage);
});


// response function
function getResponse(callback)
{
  var mockService = nock("https://api.austinbot.com")
  .persist() // This will persist mock interception for lifetime of program.
  .get("/sprint")
  .reply(200, JSON.stringify(data.sprint) );



  Main.findNumberOfSprints().then(function (results)
  {
    console.log("Danish"+results.sprint_count);
    var sp_size = results.sprint_count;
    return callback(sp_size);
  }
);

  // var latitude = "48.208579"
	// var longitude = "16.374124"
	// forecast.get(latitude, longitude, function (err, res, data) 
	// {
  //     if (err) throw err;
  //     //console.log('res: ' + JSON.stringify(res));
  //     console.log('data: ' + JSON.stringify(data));
  //     var w = data.currently.summary + " and feels like " + data.currently.apparentTemperature;
  //     callback(w);
  //  });

  

}


