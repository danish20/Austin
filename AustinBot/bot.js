
var Botkit = require('botkit');

var Main = require('../AustinBot/main');
var nock = require("nock");
var os = require('os');

var spawn = require("child_process").spawn;





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
controller.hears('setup sprint', ['mention', 'direct_mention', 'direct_message'], function (bot, message) {
  //console.log(message);


//   var process = spawn('python', ["path/to/script.py",]);
//   getResponse(function (w) {

//     bot.reply(message, w + "");

//   });
// });
controller.hears('new sprint', ['mention', 'direct_mention', 'direct_message'], function (bot, message) {
  console.log(message);
  getResponse(function (w) {

    bot.reply(message, w);

  });
});

controller.hears('get sprint 20', ['mention', 'direct_mention', 'direct_message'], function (bot, message) {
  console.log(message);
  getSprint(20, function (w) {

    bot.reply(message, w + "");

  });
});

controller.hears('Show Burndown charts', ['mention', 'direct_mention', 'direct_message'], function (bot, message) {
  console.log(message + "");
  bot.startConversation(message, function (err, convo) {
    convo.ask('For which Sprint? Please type Sprint ID or Sprint name.', function (answer, convo) {
      var sprint_id = answer.text.slice(-2);
      getBurndown(sprint_id, function (w) {

        var imageURL = w;
        var preText = "Your Burndown chart for Sprint " + sprint_id + " is shown below"
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
  });
});




//USE CASE 1: Show performance of a user in given sprint
controller.hears('Show performance of (.*)', ['mention', 'direct_mention', 'direct_message'], function (bot, message) {
  var name = message.match[1];
  //console.log(name + "HelloW");
  bot.startConversation(message, function (err, convo) {

    convo.say("Sure");
    convo.ask('For which sprint you want to see the performance? Enter Sprint name or ID.', function (response, convo) {
      var sprint_id = response.text.slice(-2);
      getUserPerformanceForSprint(name,sprint_id, function (w) {

        var imageURL = w;
        console.log(w + "HelloW");
        var preText = "Performance of "+name+" for Sprint "+ sprint_id + " is shown below"
        var titleText = "Performance Chart"
        var responsiveChart = "link_here"
        var perfImage = {
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
        convo.say(perfImage);
        convo.next();
      });
    });
  });
});


//USE CASE 4: Facts about the most number of commits.
controller.hears('Who has made most number of commits?', ['mention', 'direct_mention', 'direct_message'], function (bot, message) {
  console.log(message);
  var repo = "Austin"
  getUsersCommits(repo, function (w) {

    bot.reply(message, w);

  });
});

controller.hears('hello', ['mention', 'direct_mention', 'direct_message'], function (bot, message) {
  var responseText = {
    "text": "Would you like to play a game?",
    "attachments": [
      {
        "text": "Choose a game to play",
        "fallback": "If you could read this message, you'd be choosing something fun to do right now.",
        "color": "#3AA3E3",
        // "attachment_type": "default",
        "callback_id": "game_selection",
        "actions": [
          {
            "name": "games_list",
            "text": "Pick a game...",
            "type": "select",
            "options": [
              {
                "text": "Hearts",
                "value": "hearts"
              },
              {
                "text": "Bridge",
                "value": "bridge"
              },
              {
                "text": "Checkers",
                "value": "checkers"
              },
              {
                "text": "Chess",
                "value": "chess"
              },
              {
                "text": "Poker",
                "value": "poker"
              },
              {
                "text": "Falken's Maze",
                "value": "maze"
              },
              {
                "text": "Global Thermonuclear War",
                "value": "war"
              }
            ]
          }
        ]
      }
    ],
    // "attachments": [
    //     {
    //         "text": "Choose a game to play",
    //         "fallback": "You are unable to choose a game",
    //         "callback_id": "wopr_game",
    //         "color": "#3AA3E3",
    //         "attachment_type": "default",
    //         "actions": [
    //             {
    //                 "name": "game",
    //                 "text": "Chess",
    //                 "type": "button",
    //                 "value": "chess"
    //             },
    //             {
    //                 "name": "game",
    //                 "text": "Falken's Maze",
    //                 "type": "button",
    //                 "value": "maze"
    //             },
    //             {
    //                 "name": "game",
    //                 "text": "Thermonuclear War",
    //                 "style": "danger",
    //                 "type": "button",
    //                 "value": "war",
    //                 "confirm": {
    //                     "title": "Are you sure?",
    //                     "text": "Wouldn't you prefer a good game of chess?",
    //                     "ok_text": "Yes",
    //                     "dismiss_text": "No"
    //                 }
    //             }
    //         ],


    //     }
    // ]
  };
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
  bot.reply(message, responseText);
});

controller.hears(['uptime', 'identify yourself', 'who are you', 'what is your name'],
  'direct_message,direct_mention,mention', function (bot, message) {

    var hostname = os.hostname();
    var uptime = formatUptime(process.uptime());

    bot.reply(message,
      ':robot_face: I am a bot named <@' + bot.identity.name +
      '>. I have been running for ' + uptime + ' on ' + hostname + '.');

  });

function formatUptime(uptime) {
  var unit = 'second';
  if (uptime > 60) {
    uptime = uptime / 60;
    unit = 'minute';
  }
  if (uptime > 60) {
    uptime = uptime / 60;
    unit = 'hour';
  }
  if (uptime != 1) {
    unit = unit + 's';
  }

  uptime = uptime + ' ' + unit;
  return uptime;
}


// Response Functions for mock service

function getSprint(sprint_id, callback) {
  Main.getSprint(sprint_id).then(function (results) {
    var sprint_data = results.sprint_data;
    return callback(sprint_data);
  });
}

function getBurndown(sprint_id, callback) {
  Main.getBurndown(sprint_id).then(function (results) {
    var burndown_img_url = results.burndown_img_url;
    return callback(burndown_img_url);
  });
}

function getUsersCommits(repo, callback) {
  Main.getUsersCommits(repo).then(function (results) {
    var msg = results.msg;
    return callback(msg);
  });
}

//Service for getting the graph of user performance
function getUserPerformanceForSprint(userId, sprintId, callback)  {
  Main.getUserPerformanceForSprint(userId, sprintId).then(function (results) {
    var perfomance_img_url = results.performance_chart_url;
    return callback(perfomance_img_url);
  });
}

