
var Botkit = require('botkit');

var Main = require('../AustinBot/main');
var nock = require("nock");
var os = require('os');
var spawn = require('child_process').spawn;
var cors = require('cors');
var path = require('path');
var express = require('express');
var request = require('request');
var route = require('./Route/route');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Store our app's ID and Secret. These we got from Step 1. 
// For this tutorial, we'll keep your API credentials right here. But for an actual app, you'll want to  store them securely in environment variables. 
var clientId = '232364447255.272562445206';
var clientSecret = '4dce130eff7f62b786833534477acc60';
const PORT=3000;
const port = 3000;
const VALID_SPRINT_ID = ["20","21","22"];
const VALID_USER_ID = ["<@U6UBVLJCV>","<@U6U2WMN82>","<@U6T81LY8J>","<@U6SMSH9HP>",]

//MONGO DB SETUP
// var mongoose = require('mongoose');
// var mongoDB = 'mongodb://127.0.0.1/test';
// mongoose.connect(mongoDB,{useMongoClient: true});
// var db = mongoose.connection;
// db.on('error',console.error.bind(console,'connection_error:'));
// db.on('connected',()=>{
//   console.log('Connected to database mongodb @27017');
// });
// db.once('open', function(){
//   console.log("DB connection alive");
// });
// app.use(express.static(path.join(__dirname,'public')));
// app.use('/api',route);

// app.listen(port,()=>{
//   console.log("Listening port 3000");
// });
// NgROK Server
app.listen(PORT, function () {
  //Callback triggered when server is successfully listening. Hurray!
  console.log("Austin Bot app listening on port " + PORT);
});


// This route handles GET requests to our root ngrok address and responds with the same "Ngrok is working message" we used before
app.get('/', function(req, res) {
  res.send("Ok at"+req.url);
});
app.get('/users', function(req, res) {
  res.send("Finding user"+req.url);
});

// This route handles get request to a /oauth endpoint. We'll use this endpoint for handling the logic of the Slack oAuth process behind our app.
app.get('/oauth', function(req, res) {
  // When a user authorizes an app, a code query parameter is passed on the oAuth endpoint. If that code is not there, we respond with an error message
  if (!req.query.code) {
      res.status(500);
      res.send({"Error": "Looks like we're not getting code."});
      console.log("Looks like we're not getting code.");
  } else {
      // If it's there...

      // We'll do a GET call to Slack's `oauth.access` endpoint, passing our app's client ID, client secret, and the code we just got as query parameters.
      request({
          url: 'https://slack.com/api/oauth.access', //URL to hit
          qs: {code: req.query.code, client_id: clientId, client_secret: clientSecret}, //Query string data
          method: 'GET', //Specify the method

      }, function (error, response, body) {
          if (error) {
              console.log(error);
          } else {
              res.json(body);

          }
      })
  }
});

// Route the endpoint that our slash command will point to and send back a simple response to indicate that ngrok is working
app.post('/command', function(req, res) {



  var jsonRes = 
  {
    "text": "Would you like to play a game?",
    "attachments": [
        {
            "text": "Choose a game to play",
            "fallback": "You are unable to choose a game",
            "callback_id": "wopr_game",
            "color": "#3AA3E3",
            "attachment_type": "default",
            "actions": [
                {
                    "name": "game",
                    "text": "Chess",
                    "type": "button",
                    "value": "chess"
                },
                {
                    "name": "game",
                    "text": "Falken's Maze",
                    "type": "button",
                    "value": "maze"
                },
                {
                    "name": "game",
                    "text": "Thermonuclear War",
                    "style": "danger",
                    "type": "button",
                    "value": "war",
                    "confirm": {
                        "title": "Are you sure?",
                        "text": "Wouldn't you prefer a good game of chess?",
                        "ok_text": "Yes",
                        "dismiss_text": "No"
                    }
                }
            ]
        }
    ]
};

var jsonRes2 = {
  "text": "Would you like to play a game?",
  "response_type": "in_channel",
  "attachments": [
      {
          "text": "Choose a game to play",
          "fallback": "If you could read this message, you'd be choosing something fun to do right now.",
          "color": "#3AA3E3",
          "attachment_type": "default",
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
  ]
};
  res.send(jsonRes2);
});


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

controller.hears(
  ['setup sprint','new sprint','create sprint'], 
  ['mention', 'direct_mention', 'direct_message'], 
  function (bot, message) {
  //redirect to a webpage for milestone 3 will create form inside slack after deploying
  bot.api.users.list({},function(err,response) {
    console.log(response);
  });
});

// Dummy Functions
controller.hears('get sprint (.*)', ['mention', 'direct_mention', 'direct_message'], function (bot, message) {
  console.log(message);
  getSprint(message.match[1], function (w) {
    bot.reply(message, w + "");
  });
});


//USE CASE 1.1: Show burndown chart of a sprint for given sprint name or id.
controller.hears(
  [
    'Show Burndown chart',
    'burndown chart',
    'show burn down chat',
    'burn down graph',
    'burndown graph'
  ], ['mention', 'direct_mention', 'direct_message'], function (bot, message) {
    console.log(message + "");
    bot.startConversation(message, function (err, convo) {
      convo.ask('For which Sprint? Please type Sprint ID or Sprint name.', function (answer, convo) {
        var sprint_id = answer.text.slice(-2);
        if(VALID_SPRINT_ID.indexOf(sprint_id)==-1)
        {
          convo.say("This Sprint ID does not exist. Please enter a valid ID");
          convo.next();
        }
        console.log(process+"TEST");
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

//USE CASE 1.2: Show performance of a user in given sprint
controller.hears('Show performance of (.*)', ['mention', 'direct_mention', 'direct_message'], function (bot, message) {
  var name = message.match[1];
  if(name == "<@U6XHA4DST>")
  {
    bot.reply(message,":face_with_rolling_eyes: I am performing really well as you can see.");
  }
  else if(VALID_USER_ID.indexOf(name)==-1)
  {
    bot.reply(message,name+" is a nice guy, but unfortunately he is not in our team.:disappointed:");
  }
  
  else
  {
  //console.log(name + "HelloW");
  bot.startConversation(message, function (err, convo) {

    convo.say("Sure");
    convo.ask('For which sprint you want to see the performance? Enter Sprint name or ID.', function (response, convo) {
      var sprint_id = response.text.slice(-2);
      if(VALID_SPRINT_ID.indexOf(sprint_id)==-1)
      {
        convo.say("This Sprint ID does not exist. Please enter a valid ID");
        convo.next();
      }
      getUserPerformanceForSprint(name, sprint_id, function (w) {

        var imageURL = w;
        console.log(w + "HelloW");
        var preText = "Performance of " + name + " for Sprint " + sprint_id + " is shown below"
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
}
});

//USE CASE 1.3: Velocity Chart
controller.hears(
  [
    'Show velocity chart',
    'show velocity graph',
    'can you show me velocity chart'
  ], ['mention', 'direct_mention', 'direct_message'], function (bot, message) {
    //console.log(message);
    getVelocityGraph(function (w) {

      var imageURL = w;
      var preText = "Your Velocity chart for all Sprints is shown below"
      var titleText = "Velocity Chart"
      var responsiveChart = "link_here"
      var velocityImage = {
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
      bot.reply(message, velocityImage);

    });
  });


//USE CASE 1.4: Sprint Status

controller.hears('Show status of sprint (.*)', ['mention', 'direct_mention', 'direct_message'], function (bot, message) {
    //console.log(message);
    var sprint_one = message.match[1];
    if(VALID_SPRINT_ID.indexOf(sprint_one)==-1)
    {
      bot.reply(message,"Please Enter a valid sprint Id");
    }
    getSprintStatus(sprint_one,function (w) {

      var imageURL = w;
      var preText = "Status of Sprint "+sprint_one
      var titleText = "Sprint Status Chart"
      var responsiveChart = "link_here"
      var sprintStatusImage = {
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
      bot.reply(message, sprintStatusImage);

    });
  });

//USE CASE 2.1: Compare Sprint work done
controller.hears('Compare work done in sprint (.*) with sprint (.*)', ['mention', 'direct_mention', 'direct_message'], function (bot, message) {
  var sprint_one = message.match[1];
  var sprint_two = message.match[2];
  if(VALID_SPRINT_ID.indexOf(sprint_one)==-1 || VALID_SPRINT_ID.indexOf(sprint_two)==-1)
  {
    bot.reply(message,":thinking_face: Oh! One of the sprint id does not exist.Please Enter a valid sprint Id. ");
  }
  else
  {
  compareSprintPerformance(sprint_one, sprint_two, function (w) {
    var imageURL = w;
    var preText = "Work comparision of Sprint " + sprint_one + " with Sprint " + sprint_two + " is shown below."
    var titleText = "Work Done Comparision Chart"
    var responsiveChart = "link_here"
    var workCompImage = {
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
    bot.reply(message,workCompImage);
  });
}
});

//USE CASE 2.2: Compare Team Performance
controller.hears(
  [
    'How is team performing',
    'Performance of team',
    'Team Performance',
    'Show team performance'
  ], ['mention', 'direct_mention', 'direct_message'], function (bot, message) {

  compareTeamPerformance(function (w) {
    var imageURL = w;
    var preText = "Team performance compared to previous Sprints"
    var titleText = "Team Sprint Performance Comparision Chart"
    var responsiveChart = "link_here"
    var workCompImage = {
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
    bot.reply(message,workCompImage);
  });
});

//USE CASE 2.3: Compare Individual Perf/ Best Performer
controller.hears('Compare individual performance in sprint (.*)', ['mention', 'direct_mention', 'direct_message'], function (bot, message) {
  var sprint_one = message.match[1];
  if(VALID_SPRINT_ID.indexOf(sprint_one)==-1)
  {
    bot.reply(message,":thinking_face: Oh! no this sprint id does not exist.Please Enter a valid sprint Id. ");
  }
  else
  {
  getSprintBestPerformer(sprint_one, function (w) {
    var imageURL = w;
    var preText = "Individual performance comparision of Sprint " + sprint_one + " is shown below."
    var titleText = "Individual Performance Comparision Chart"
    var responsiveChart = "link_here"
    var indvPerfCompImage = {
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
    bot.reply(message,indvPerfCompImage);
  });
}
});

//USE CASE 2.4: Compare Task Performance
controller.hears('Compare task performance in sprint (.*)', ['mention','direct_mention', 'direct_message'], function (bot, message) {
  var sprint_one = message.match[1];
  if(VALID_SPRINT_ID.indexOf(sprint_one)==-1 )
  {
    bot.reply(message,":thinking_face: Oh! no this sprint id does not exist.Please Enter a valid sprint Id. ");
  }
  else
  {
  getTaskPerformance(sprint_one, function (w) {
    var imageURL = w;
    var preText = "Task performance comparision of Sprint " + sprint_one;
    var titleText = "Task Performance Comparision Chart"
    var responsiveChart = "link_here"
    var taskPerfCompImage = {
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
    bot.reply(message,taskPerfCompImage);
  });
}
});



//USE CASE 4: Facts about the most number of commits.
controller.hears(
  [
    'Who has made most number of commits?',
    'most commits made by',
    'most commits'
  ], ['mention', 'direct_mention', 'direct_message'], function (bot, message) {
    console.log(message);
    var repo = "Austin"
    getUsersCommits("dsuri",repo, function (w) {

      bot.reply(message, w);

    });
  });


// Dummy Function
//TODO: Bot interactions will replace this.
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

// Help Menu
controller.hears(['help', 'what can you do', 'help me', '(.*)'],
  'direct_message,direct_mention,mention', function (bot, message) {

    var colors = ['good', 'warning', 'danger'];
    var count = 0;

    //Sprint Status
    var helpMessage = {

      "attachments": [
        {
          "title": "Generate Sprint Summary",
          "pretext": "I can help you with following tasks.",
          "fields": [
            {
              "title": "Burndown Chart",
              "value": "_Show Burndown chart_",
              "short": false
            },
            {
              "title": "Individual's performance chart",
              "value": "_Show performance of `<teamMemberName>`_",
              "short": false
            },
           
            {
              "title": "Velocity Graph",
              "value": "_Show velocity graph_",
              "short": false
            },
            {
              "title": "Sprint Status",
              "value": "_Show status of `<sprintName>` or `<sprintID>`_",
              "short": false
            },
          ],
          "mrkdwn_in": ["fields", "title"],
          "color": colors[(count++) % 3],
        },
        {
          "title": "Compare Sprint Metrics",
          "fields": [
            {
              "title": "Work done in one sprint with other sprint",
              "value": "_Compare work done in `<sprint-1-Name/ID>` with `<sprint-1-Name/ID>`_",
              "short": false
            },
            {
              "title": "Performance of team with respect to previous sprint performance.",
              "value": "_Show team performance_",
              "short": false
            },

            {
              "title": "Who Performed the most?",
              "value": "_Compare Individual Performance in `<sprintName>` or `<sprintID>`_",
              "short": false
            },
            {
              "title": "Compare Performance based on each task",
              "value": "_Compare Task Performance in `<sprintName>` or `<sprintID>`_",
              "short": false
            }
          ],
          "mrkdwn_in": ["fields"],
          "color": colors[(count++) % 3],
        },
        {
          "title": "Recommendations and Facts",
          "fields": [
            {
              "title": "Most no of commits/additions made by a user",
              "value": "_Who has made most number of commits_",
              "short": false
            },
          ],
          "mrkdwn_in": ["fields"],
          "color": colors[(count++) % 3],
        }
      ]
    }
    bot.reply(message, helpMessage);
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
  }F
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
  invokeBurndownPy(sprint_id,function(){
    Main.getBurndown(sprint_id).then(function (results) {
      var burndown_img_url = results.burndown_img_url;
      return callback(burndown_img_url);
    });
  });
 
}
//invoke python for burndown chart
function invokeBurndownPy(sprint_id,callback)
{
  var py = spawn('python', ['../Milestone3/Python/Scripts/burndown.py',sprint_id]);
  setTimeout(callback,5000);
}

function getUsersCommits(owner,repo, callback) {
  
  Main.getUsersCommits(owner,repo).then(function (results) {
    var msg = results.msg;
    return callback(msg);
  });
}

//Service for getting the graph of user performance
function getUserPerformanceForSprint(userId, sprintId, callback) {
  invokeUserPerformancePy(userId,sprintId,function(){
  Main.getUserPerformanceForSprint(userId, sprintId).then(function (results) {
    var perfomance_img_url = results.performance_chart_url;
    return callback(perfomance_img_url);
  });
});
}
//invoke python for user performance
function invokeUserPerformancePy(userId, sprint_id, callback)
{
  console.log("User ID: "+userId+" sprint id: "+sprint_id);
  var py    = spawn('python', ['../Milestone3/Python/Scripts/user_performance.py', userId, sprint_id]);

  setTimeout(callback,5000);
} 

//Service for getting the velocity graph of past and current sprints
function getVelocityGraph(callback) {
  invokeVelocityPy(function(){
  Main.getVelocityGraph().then(function (results) {
    var velocity_graph_url = results.velocity_graph_url;
    return callback(velocity_graph_url);
  });
});
}
//invoke python for velocity graph
function invokeVelocityPy(callback)
{
  var py    = spawn('python', ['../Milestone3/Python/Scripts/velocity.py']);
  setTimeout(callback,5000);
}

//Service for getting the sprint performance comparison graph for two sprints
function compareSprintPerformance(sprintId1, sprintId2, callback) {
  invokeSprintPerformancePy(sprintId1,sprintId2,function(){
  Main.compareSprintPerformance(sprintId1, sprintId2).then(function (results) {
    var compare_sprint_perf_url = results.compare_sprint_perf_url;
    return callback(compare_sprint_perf_url);
  });
});
}
//invoke python for compare sprint performance graph
function invokeSprintPerformancePy(sprintId1, sprintId2, callback)
{
  var py    = spawn('python', ['../Milestone3/Python/Scripts/sprint_performance.py', sprintId1, sprintId2]);
  setTimeout(callback,5000);
}

//Service for getting the performance based on each task and time spent on it
function getTaskPerformance(sprint_id, callback) {
  invokeTaskPerformancePy(sprint_id,function(){
  Main.getTaskPerformance(sprint_id).then(function (results) {
    var task_performance_url = results.task_performance_img_url;
    return callback(task_performance_url);
  });
});
}
//invoke python for task performance graph
function invokeTaskPerformancePy(sprint_id, callback)
{
  var py    = spawn('python', ['../Milestone3/Python/Scripts/task_performance.py', sprint_id]);
  setTimeout(callback,5000);
}

//Service for getting the best performer in a sprint
function getSprintBestPerformer(sprint_id, callback) {
  invokeBestUserPerformancePy(sprint_id,function(){
  Main.getSprintBestPerformer(sprint_id).then(function (results) {
    var sprintBestPerformer_url = results.best_performer_img_url;
    return callback(sprintBestPerformer_url);
  });
});
}
//invoke python for compare user performance
function invokeBestUserPerformancePy(sprint_id, callback)
{
  var py    = spawn('python', ['../Milestone3/Python/Scripts/compare_user_performance.py', sprint_id]);
  setTimeout(callback,5000);
}

//Service for getting the sprint status - usecase 1.4
function getSprintStatus(sprint_id, callback) {
  invokeSprintStatusPy(sprint_id,function(){
  Main.getSprintStatus(sprint_id).then(function (results) {
    var getSprintStatus_url = results.sprint_status_url;
    return callback(getSprintStatus_url);
  });
});
}
//invoke python for sprint status
function invokeSprintStatusPy(sprint_id, callback)
{
  var py    = spawn('python', ['../Milestone3/Python/Scripts/sprint_status.py', sprint_id]);
  setTimeout(callback,5000);
}

//Service for comparing team performance - usecase 2.2
function compareTeamPerformance( callback) {
  invokeCompareTeamPerformancePy(function(){
  Main.compareTeamPerformance().then(function (results) {
    var teamPerformance_url = results.teamPerformance_img_url;
    return callback(teamPerformance_url);
  });
});
}
//invoke python for compare team performance
function invokeCompareTeamPerformancePy(callback)
{
  var py    = spawn('python', ['../Milestone3/Python/Scripts/compare_team_performance.py']);
  setTimeout(callback,5000);
}

//Service for getting the recommendation
function getRecommendationOnTaskHours(num_hours, callback) {
  invokeRecommendHoursPy(num_hours, function(){
  Main.getRecommendationOnTaskHours().then(function (results) {
    var recommended_hours = results.task_hours_recom;
    return callback(recommended_hours);
  });
});
}
//invoke python for hours recommendation
function invokeRecommendHoursPy(num_hours, callback)
{
  var py    = spawn('python', ['../Milestone3/Python/Scripts/recommend_hours.py', num_hours]);
  setTimeout(callback,5000);
}