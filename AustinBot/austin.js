var Promise = require("bluebird");
var _ = require("underscore");
var request = require("request");
var querystring = require('querystring');

var urlRoot = "https://api.austinbot.com";
<<<<<<< HEAD
var urlGithubRoot = "https://github.ncsu.edu/api/v3";
||||||| merged common ancestors

=======
var urlGithubRoot = "https://github.ncsu.edu/api/v3";

>>>>>>> e823fd9da21a9aa4822b87b608d699b53aa77fb4
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


exports.getSprints = getSprints;
exports.getSprint = getSprint;

//get burndown chart of a particular sprint by sprint_id
function getBurndown(sprint_id)
{
    var options = {
        //url: urlRoot + "/sprint/" + sprint_id,
        url: "https://api.myjson.com/bins/yci6b",
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
<<<<<<< HEAD
function getUsersCommits(repo,owner)
{   
||||||| merged common ancestors
function getUsersCommits(repo)
{
=======
function getUsersCommits(owner, repo)
{
>>>>>>> e823fd9da21a9aa4822b87b608d699b53aa77fb4
    var options = {
<<<<<<< HEAD
        url: urlGithubRoot + "/repos/" + owner + "/" + repo + "/stats/contributors",
||||||| merged common ancestors
        url: urlRoot + "/stats/" + repo,
=======
        url: urlGithubRoot + "/repos/" + owner + "/" + repo + "/stats/contributors" ,
>>>>>>> e823fd9da21a9aa4822b87b608d699b53aa77fb4
        method: "GET",
        headers: {
            "content-type": "application/json",
            "Authorization":"token 5bec6b54b5c542c4b0ff2f393844e70891e5c5bb"
        }
    };

    console.log(options.url+"HELLO "+process.env.GITHUBTOKEN);

    return new Promise(function (resolve, reject){
        request(options, function(error, response, body)
        {
            var obj = JSON.parse(body);
            console.log(obj);
            resolve(obj);
        });
    });
}

function getUserPerformanceForSprint(userId, sprintId) 
{
    var options = {
        url: urlRoot + "/performance/" + userId + "/" + sprintId,
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

function getVelocityGraph() 
{
    var options = {
        url: urlRoot + "/velocity",
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    };

    return new Promise(function (resolve, reject){
        request(options, function(error, response, body)
        {

            var obj = JSON.parse(body);
            //console.log(obj);
            resolve(obj);
        });
    });
}

function compareSprintPerformance(sprintId1, sprintId2) 
{
    var options = {
        url: urlRoot + "/compareSprints?sprintId1=" + sprintId1 + "&sprintId2=" + sprintId2,
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    };

    return new Promise(function (resolve, reject){
        request(options, function(error, response, body)
        {

            var obj = JSON.parse(body);
            //console.log(obj);
            resolve(obj);
        });
    });
}

function getTaskPerformance(sprint_id)
{
    var options = {
        url: urlRoot + "/sprintTaskPerformance/" + sprint_id,
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

function getSprintBestPerformer(sprint_id)
{
    var options = {
        url: urlRoot + "/bestPerformer/" + sprint_id,
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

function getSprintStatus(sprint_id)
{
    var options = {
        url: urlRoot + "/sprintStatus/" + sprint_id,
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

function compareTeamPerformance() 
{
    var options = {
        url: urlRoot + "/compareTeamPerformance",
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    };

    return new Promise(function (resolve, reject){
        request(options, function(error, response, body)
        {

            var obj = JSON.parse(body);
            //console.log(obj);
            resolve(obj);
        });
    });
}

exports.getSprints = getSprints;
exports.getSprint = getSprint;
exports.getBurndown = getBurndown;
exports.getUsersCommits = getUsersCommits;
exports.getUserPerformanceForSprint = getUserPerformanceForSprint;
exports.getVelocityGraph = getVelocityGraph;
exports.compareSprintPerformance = compareSprintPerformance;
exports.getTaskPerformance = getTaskPerformance;
exports.getSprintBestPerformer = getSprintBestPerformer;
exports.getSprintStatus = getSprintStatus;
exports.compareTeamPerformance = compareTeamPerformance;