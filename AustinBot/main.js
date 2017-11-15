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
/*	var mockService = nock("https://api.austinbot.com")
	.persist() // This will persist mock interception for lifetime of program.
	.get("/sprint")
	.reply(200, JSON.stringify(data.sprint) );
*/
	return new Promise(function (resolve, reject) 
	{
		// mock data needs list of issues.
		austin.getSprints().then(function (sprints) 
		{
			console.log(sprints.length);
            var sprint_count = sprints.length;
			
			resolve({sprint_count: sprint_count});
		});
	});
}

function getSprint(sprint_id){
/*	var mockService = nock("https://api.austinbot.com")
	.persist() // This will persist mock interception for lifetime of program.
	.get("/sprint/20")
	.reply(200, JSON.stringify(data.sprint));
*/
	return new Promise(function (resolve, reject) 
	{
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
/*	var mockService = nock("https://api.austinbot.com")
	.persist() // This will persist mock interception for lifetime of program.
	.get("/sprint/21")
	.reply(200, JSON.stringify(data.sprint));
*/
	return new Promise(function (resolve, reject) 
	{
		austin.getBurndown(sprint_id).then(function (obj) 
		{
			console.log("got burndown for sprint::"+sprint_id);
			//console.log(sprints.length);
			var sprint_burndown_img = obj.burndown_img_url;
			resolve({burndown_img_url: sprint_burndown_img});
		});
	});
}

function getUsersCommits(owner, repo){
/*	var mockService = nock("https://api.austinbot.com")
	.persist() // This will persist mock interception for lifetime of program.
	.get("/stats/Austin")
	.reply(200, JSON.stringify(data.Austin_repo_stats));
*/
	return new Promise(function (resolve, reject) 
	{
		austin.getUsersCommits(owner, repo).then(function (stats) 
		{
			console.log("got stats::"+repo);
			
			var stats_data = stats;
			console.log("stats length::"+stats_data.length);
			var max_user = undefined;
			var max_commits = 0;
			for(var i=0;i<stats_data.length;i++){
				var commits = stats_data[i].total;
				var user = stats_data[i].author.login;

				if(commits >= max_commits){
					max_commits = commits;
					max_user = user;
				}
			}
			var msg = "";
			if(max_user != undefined){
				msg = max_user + " has most number of commits with " + max_commits + " commits."
			}else{
				msg = "Failed to get information";
			}
			
			resolve({msg: msg});
		});
	});
}

function getUserPerformanceForSprint(userId, sprintId) {
/*	var mockService = nock("https://api.austinbot.com")
	.persist() // This will persist mock interception for lifetime of program.
	.get("/performance/sandeep/20")
	.reply(200, JSON.stringify(data.sprint));
*/
	return new Promise(function (resolve, reject) 
	{
		// mock data needs list of issues.
		austin.getUserPerformanceForSprint(userId, sprintId).then(function (obj) 
		{
			console.log("got perfomance for ::"+userId+"::"+sprintId);

			var performance_chart_url = obj.performance_chart_url;
			resolve({performance_chart_url: performance_chart_url});
		});
	});	
}

function getVelocityGraph() {
/*	var mockService = nock("https://api.austinbot.com")
	.persist() // This will persist mock interception for lifetime of program.
	.get("/velocity")
	.reply(200, JSON.stringify(data.velocity_graph_url));
*/
	return new Promise(function (resolve, reject) 
	{
		
		austin.getVelocityGraph().then(function (obj) 
		{
			console.log("got url for velocity graph::"+obj.velocity_graph_url);
			resolve({velocity_graph_url: obj.velocity_graph_url});
		});
	});	
}

function compareSprintPerformance(sprintId1, sprintId2) {
/*	var mockService = nock("https://api.austinbot.com")
	.persist() // This will persist mock interception for lifetime of program.
	.get("/compareSprints?sprintId1=20&sprintId2=21")
	.reply(200, JSON.stringify(data.sprints_performance_comparison_graph));
*/
	return new Promise(function (resolve, reject) 
	{
		
		austin.compareSprintPerformance(sprintId1, sprintId2).then(function (obj) 
		{
			console.log("got obj for graph::"+obj);

			resolve({compare_sprint_perf_url: obj.sprints_performance_comparison_graph});
		});
	});
}

function getTaskPerformance(sprint_id){
/*	var mockService = nock("https://api.austinbot.com")
	.persist() // This will persist mock interception for lifetime of program.
	.get("/sprintTaskPerformance/20")
	.reply(200, JSON.stringify(data.sprint));
*/
	return new Promise(function (resolve, reject) 
	{
		
		austin.getTaskPerformance(sprint_id).then(function (obj) 
		{
			console.log("got task performance for sprint::"+obj.task_performance_img_url);

			resolve({task_performance_img_url: obj.task_performance_img_url});
		});
	});
}

function getSprintBestPerformer(sprint_id){
/*	var mockService = nock("https://api.austinbot.com")
	.persist() // This will persist mock interception for lifetime of program.
	.get("/bestPerformer/21")
	.reply(200, JSON.stringify(data.sprint));
*/
	return new Promise(function (resolve, reject) 
	{
		
		austin.getSprintBestPerformer(sprint_id).then(function (obj) 
		{
			console.log("got sprint best performer::"+obj);

			resolve({best_performer_img_url: obj.best_performer_img_url});
		});
	});
}

function getSprintStatus(sprint_id){
/*	var mockService = nock("https://api.austinbot.com")
	.persist() // This will persist mock interception for lifetime of program.
	.get("/sprintStatus/21")
	.reply(200, JSON.stringify(data.sprint));
*/
	return new Promise(function (resolve, reject) 
	{
		
		austin.getSprintStatus(sprint_id).then(function (obj) 
		{
			console.log("got status for sprint::"+sprint_id);

			resolve({sprint_status_url: obj.sprint_status_img_url});
		});
	});
}

function compareTeamPerformance() {
/*	var mockService = nock("https://api.austinbot.com")
	.persist() // This will persist mock interception for lifetime of program.
	.get("/compareTeamPerformance")
	.reply(200, JSON.stringify(data.teamPerformance_graph_url));
*/
	return new Promise(function (resolve, reject) 
	{
		
		austin.compareTeamPerformance().then(function (obj) 
		{
			console.log("got url for team performance graph::"+obj.teamPerformance_graph_url);
			resolve({teamPerformance_img_url: obj.teamPerformance_graph_url});
		});
	});	
}

function getRecommendationOnTaskHours(){
	return new Promise(function (resolve, reject) 
	{
		austin.getRecommendationOnTaskHours().then(function (obj) 
		{
			console.log("got data from api::"+obj.recommendation);
			resolve({task_hours_recom: obj.recommendation});
		});
	});
}

exports.findNumberOfSprints = findNumberOfSprints;
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