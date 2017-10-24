var Promise = require("bluebird");
var _ = require("underscore");
var request = require("request");
var querystring = require('querystring');

var urlRoot = "https://api.austinbot.com";

function getSprints()
{
    var options = {
        url: urlRoot + "/sprint",
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    };
    
    return new Promise(function (resolve, reject)
    {
        request(options, function(error, response, body)
        {
            var obj = JSON.parse(body);
            console.log(obj);
            resolve(obj);
        });
    });
}

//get a particular sprint by sprint_id
function getSprint(sprint_id)
{
    var options = {
        url: urlRoot + "/sprint/" + sprint_id,
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    };

    return new Promise(function (resolve, reject){
        request(options, function(error, response, body)
        {
            var obj = JSON.parse(body);
            console.log(obj);
            resolve(obj);
        });
    });
}

<<<<<<< HEAD
exports.getSprints = getSprints;
exports.getSprint = getSprint;
=======
//get burndown chart of a particular sprint by sprint_id
function getBurndown(sprint_id)
{
    var options = {
        url: urlRoot + "/sprint/" + sprint_id,
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    };

    return new Promise(function (resolve, reject){
        request(options, function(error, response, body)
        {
            var obj = JSON.parse(body);
            console.log(obj);
            resolve(obj);
        });
    });
}

//get stats for a particular repo
function getUsersCommits(repo)
{
    var options = {
        url: urlRoot + "/stats/" + repo,
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    };

    return new Promise(function (resolve, reject){
        request(options, function(error, response, body)
        {
            var obj = JSON.parse(body);
            console.log(obj);
            resolve(obj);
        });
    });
}

exports.getSprints = getSprints;
exports.getSprint = getSprint;
exports.getBurndown = getBurndown;
exports.getUsersCommits = getUsersCommits;
>>>>>>> 029d5997b08c3c462d4c430819d591735956b73d
