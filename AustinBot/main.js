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

function dummy(){
	
}

exports.findNumberOfSprints = findNumberOfSprints;