
var Botkit = require('botkit');
var Forecast = require('forecast.io');
var options = {APIKey:process.env.FORECASTTOKEN};
var forecast = new Forecast(options);

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
  console.log(message);
  getResponse(function(w){

    bot.reply(message,w);

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
  console.log(message);
  bot.reply(message,'Hello, How are you?');
});


// response function
function getResponse(callback)
{
  var latitude = "48.208579"
	var longitude = "16.374124"
	forecast.get(latitude, longitude, function (err, res, data) 
	{
      if (err) throw err;
      //console.log('res: ' + JSON.stringify(res));
      console.log('data: ' + JSON.stringify(data));
      var w = data.currently.summary + " and feels like " + data.currently.apparentTemperature;
      callback(w);
   });
}


