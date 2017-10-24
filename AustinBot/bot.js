
var Botkit = require('botkit');
var Forecast = require('forecast.io');
var options = {APIKey:process.env.FORECASTTOKEN};
var forecast = new Forecast(options);
var Main = require('../AustinBot/main');
var nock = require("nock");




//var childProcess = require("child_process");

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

controller.hears('get sprint 20',['mention', 'direct_mention','direct_message'], function(bot,message) 
{
  console.log(message);
  getSprint(20, function(w){

    bot.reply(message,w+"");

  });
});

controller.hears('Show Burndown charts',['mention', 'direct_mention','direct_message'], function(bot,message) 
{
  console.log(message+"");
  bot.startConversation(message, function(err, convo) {
    convo.ask('For which Sprint? Please type Sprint ID or Sprint name.', function(answer, convo) {
      var sprint_id = answer.text.slice(-2);
      getBurndown(sprint_id, function(w){
    
        var imageURL = w;
        var preText = "Your Burndown chart for Sprint"+sprint_id+" is shown below"
        var titleText = "Burndown Chart"
        var responsiveChart = "link_here"
        var burndownImage = {
          "attachments": [
              {
                  "pretext": preText,
                  "title": titleText,
                  "title_link": responsiveChart,
                  "image_url": imageURL,
                  "color": "#ffa500"
              }
          ]
        };
      convo.say(burndownImage); 
      convo.next();
    });
  });


   // bot.reply(message,burndownImage);

  });
});

controller.hears('get most commits user Austin',['mention', 'direct_mention','direct_message'], function(bot,message) 
{
  console.log(message);
  var repo = "Austin"
  getUsersCommits(repo, function(w){

    bot.reply(message,w);

  });
});

controller.hears('hello',['mention', 'direct_mention','direct_message'], function(bot,message) 
{
  bot.startConversation(message, function(err, convo) {
    convo.ask('For which Sprint? Please type Sprint ID or Sprint name.', function(answer, convo) {
      var sprint_num = answer.text.slice(-2);
      convo.say(sprint_num); 
      convo.next();
    });
  });
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



var imageURL = "https://s3.us-east-2.amazonaws.com/austinbot/plot_image.png";
var preText = "Your Burndown chart for this sprint is shown below"
var titleText = "Burndown Chart"
var responsiveChart = "link_here"
var burndownImage = {
  "attachments": [
      {
          "pretext": preText,
          "title": titleText,
          "title_link": responsiveChart,
          "image_url": imageURL,
          "color": "#ffa500"
      }
  ]
};
  //bot.reply(message,burndownImage);
});


// response function
function getResponse(callback)
{
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

function getSprint(sprint_id, callback)
{
  Main.getSprint(sprint_id).then(function (results)
  {
    var sprint_data = results.sprint_data;
    return callback(sprint_data);
  });
}

function getBurndown(sprint_id, callback)
{
  Main.getBurndown(sprint_id).then(function (results)
  {
    var burndown_img_url = results.burndown_img_url;
    return callback(burndown_img_url);
  });
}

function getUsersCommits(repo, callback)
{
  Main.getUsersCommits(repo).then(function (results)
  {
    var msg = results.msg;
    return callback(msg);
  });
}

