
var Botkit = require('botkit');

var Main = require('../AustinBot/main');
var nock = require("nock");
var os = require('os');
var PythonShell = require('python-shell');

var options = {
 mode: 'text',
 //pythonPath: '../Milestone2/Python/Scripts/burndown.py',
 pythonOptions: ['-u'],
 scriptPath: '../Milestone2/Python/Scripts',
 args: ['20']
};

PythonShell.run('burndown.py', options, function (err, results) {
 if (err) throw err;
 // results is an array consisting of messages collected during execution 
 console.log('results: %j', results);
});

//var spawn = require("child_process").spawn;

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


  //var process = spawn('python', ["path/to/script.py",]);
  getResponse(function (w) {

    bot.reply(message, w + "");

  });
});
controller.hears('new sprint', ['mention', 'direct_mention', 'direct_message'], function (bot, message) {
  console.log(message);
  // getResponse(function (w) {

  //   bot.reply(message, w);

  // });
});

// Dummy Functions
controller.hears('get sprint 20', ['mention', 'direct_mention', 'direct_message'], function (bot, message) {
  console.log(message);
  getSprint(20, function (w) {

    bot.reply(message, w + "");

  });
});


//USE CASE 1: Show burndown chart of a sprint for given sprint name or id.
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
        var process = spawn('python',["../Milestone2/Python/Scripts/burndown.py", sprint_id]);
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

//USE CASE 1: Show performance of a user in given sprint
controller.hears('Show performance of (.*)', ['mention', 'direct_mention', 'direct_message'], function (bot, message) {
  var name = message.match[1];
  //console.log(name + "HelloW");
  bot.startConversation(message, function (err, convo) {

    convo.say("Sure");
    convo.ask('For which sprint you want to see the performance? Enter Sprint name or ID.', function (response, convo) {
      var sprint_id = response.text.slice(-2);
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
});

//USE CASE 1: Velocity Chart
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


//USE CASE 1: Sprint Status

//USE CASE 2: Compare Sprint work done
controller.hears('Compare work done in sprint (.*) with sprint (.*)', ['mention', 'direct_mention', 'direct_message'], function (bot, message) {
  var sprint_one = message.match[1];
  var sprint_two = message.match[2];
  //console.log(sprint_one+"HELLOW"+sprint_two);
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
    getUsersCommits(repo, function (w) {

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
controller.hears(['help', 'what can you do', 'help me', 'how to do (.*)'],
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
              "value": "_What is current Sprint status_",
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
              "title": "Work done in current sprint with other sprint",
              "value": "_Compare work done of sprint with `<sprintName>` or `<sprintID>`_",
              "short": false
            },
            {
              "title": "Individual's performance chart",
              "value": "Show performance of 'Austin'",
              "short": false
            },
            {
              "title": "Velocity Graph",
              "value": "Show velocity graph",
              "short": false
            },
            {
              "title": "Sprint Status",
              "value": "What is current Sprint status",
              "short": false
            },
          ],
          "mrkdwn_in": ["fields"],
          "color": colors[(count++) % 3],
        },

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
function getUserPerformanceForSprint(userId, sprintId, callback) {
  Main.getUserPerformanceForSprint(userId, sprintId).then(function (results) {
    var perfomance_img_url = results.performance_chart_url;
    return callback(perfomance_img_url);
  });
}

//Service for getting the velocity graph of past and current sprints
function getVelocityGraph(callback) {
  Main.getVelocityGraph().then(function (results) {
    var velocity_graph_url = results.velocity_graph_url;
    return callback(velocity_graph_url);
  });
}

//Service for getting the sprint performance comparison graph for two sprints
function compareSprintPerformance(sprintId1, sprintId2, callback) {
  Main.compareSprintPerformance(sprintId1, sprintId2).then(function (results) {
    var compare_sprint_perf_url = results.compare_sprint_perf_url;
    return callback(compare_sprint_perf_url);
  });
}

//Service for getting the performance based on each task and time spent on it
function getTaskPerformance(sprint_id, callback) {
  Main.getTaskPerformance(sprint_id).then(function (results) {
    var task_performance_url = results.task_performance_img_url;
    return callback(task_performance_url);
  });
}

//Service for getting the best performer in a sprint
function getSprintBestPerformer(sprint_id, callback) {
  Main.getSprintBestPerformer(sprint_id).then(function (results) {
    var sprintBestPerformer_url = results.best_performer_img_url;
    return callback(sprintBestPerformer_url);
  });
}