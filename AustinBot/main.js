var Promise = require("bluebird");
var chai = require("chai");
var expect = chai.expect;
var nock = require("nock");
var _ = require("underscore");

var austin = require("./austin.js");
var data = require("../AustinBot/mockData.json");

//function to get the number of sprints
function findNumberOfSprints()
{
	var mockService = nock("https://api.austinbot.com")
	.persist() // This will persist mock interception for lifetime of program.
	.get("/sprint")
	.reply(200, JSON.stringify(data.sprint) );

	return new Promise(function (resolve, reject) 
	{
		// mock data needs list of issues.
		austin.getSprints().then(function (sprints) 
		{
			console.log("hi");
			console.log(sprints.length);
            var sprint_count = sprints.length;
			
			resolve({sprint_count: sprint_count});
		});
	});
}

function getSprint(sprint_id){
	var mockService = nock("https://api.austinbot.com")
	.persist() // This will persist mock interception for lifetime of program.
	.get("/sprint/20")
	.reply(200, JSON.stringify(data.sprint));

	return new Promise(function (resolve, reject) 
	{
		// mock data needs list of issues.
		austin.getSprint(sprint_id).then(function (sprint) 
		{
			console.log("got sprint::"+sprint_id);
			//console.log(sprints.length);
			var sprint_data = sprint;
			console.log(sprint_data);
			resolve({sprint_data: sprint_data});
		});
	});
}

function getBurndown(sprint_id){
	var mockService = nock("https://api.austinbot.com")
	.persist() // This will persist mock interception for lifetime of program.
	.get("/sprint/20")
	.reply(200, JSON.stringify(data.sprint));

	return new Promise(function (resolve, reject) 
	{
		// mock data needs list of issues.
		austin.getBurndown(sprint_id).then(function (sprint) 
		{
			console.log("got sprint for burndown::"+sprint_id);
			//console.log(sprints.length);
			var sprint_data = sprint;
			console.log(sprint_data);
			var sprint_20_burndown = sprint_data[0].burndown_img_url;
			resolve({burndown_img_url: sprint_20_burndown});
		});
	});
}

exports.findNumberOfSprints = findNumberOfSprints;
exports.getSprint = getSprint;
exports.getBurndown = getBurndown;