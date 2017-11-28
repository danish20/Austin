var Promise = require("bluebird");
var _ = require("underscore");
var request = require("request");
var querystring = require('querystring');

var urlRoot = "34.209.179.187:3001/api";
var urlGithubRoot = "https://github.ncsu.edu/api/v3";
const GITHUB_TOKEN = "token YOUR_TOKEN_HERE"

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
        url: urlRoot + "/sprintById/" + sprint_id,
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
        url: urlRoot + '/burnDownChart/'+sprint_id,
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    };

    return new Promise(function (resolve, reject){
        request(options, function(error, response, body)
        {
            console.log("Chal Pada"+urlRoot);
            var obj = JSON.parse(body);
            console.log("Ye bhi Chal Pada");
            console.log(obj);
            resolve(obj);
        });
    });
}

//get stats for a particular repo
function getUsersCommits(owner, repo)
{
    var options = {
        url: urlGithubRoot + "/repos/" + owner + "/" + repo + "/stats/contributors" ,
        method: "GET",
        headers: {
            "content-type": "application/json",
            "Authorization": GITHUB_TOKEN
        }
    };

    //console.log(options.url+"HELLO "+process.env.GITHUBTOKEN);

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
        url: urlRoot + "/userPerformance/" + sprintId + "/" + userId,
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
        url: urlRoot + "/velocityGraph",
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
        url: urlRoot + "/sprintPerfComparison",
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
        url: urlRoot + "/taskPerformance/" + sprint_id,
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
        url: urlRoot + "/bestPerformance/" + sprint_id,
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
        url: urlRoot + "/teamPerformance",
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

function getRecommendationOnTaskHours() 
{
    var options = {
        url: urlRoot + "/recommendation",
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
exports.getRecommendationOnTaskHours = getRecommendationOnTaskHours;