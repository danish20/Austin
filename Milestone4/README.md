## MILESTONE 4 : DEPLOYMENT

## Use Cases

Please find 3 use cases in following file: 

https://github.ncsu.edu/dsuri/Austin/blob/master/Milestone2/use_case.md


## Deployment

In the previous milestone, we implemented the services required for the 3 use cases. In this milestone, we deployed the Austin bot to AWS EC2 instance. Below are the deployment scripts we used:

[Deployment Script](https://github.ncsu.edu/dsuri/Austin/blob/master/Milestone4/Ansible_Scripts/deploy.yml)

## Task Tracking -- WORKSHEET.md

We have Trello Cards for Task tracking.

Please find worksheet at https://github.ncsu.edu/dsuri/Austin/blob/master/Milestone4/WORKSHEET.md

## Screencast

The screencast for Milestone 4 can be found here: 

## Acceptance Testing

The purpose of the bot is to provide better insights about the team performance in each sprint and overall, using some analytics on the sprint data. 

We have deployed the bot on the slack channel: <enter link>

In order to use the bot, the user needs to be a part of the channel. The credentials for the user account are given below:

username:

password:

### General Instructions

All the commands to the bot start with '@Austin'. For example, if you want to display the burndown chart, type '@Austin show burndown chart'. The list of all functionalities that the bot is able to perform can be viewed using the 'help' command. Note that images that the bot fetches are unfurled from a URL. However, slack uses cached images to unfurl the URL. So if you are using the same command more than once, but with different parameters, make sure you clear the cache before doing so.

### Use Case 1: Generate Sprint Summary

* **Generate burndown chart:** Enter '@Austin generate burndown chart'. The bot will ask for a sprint ID. The available sprint IDs are 20, 21, 22.

* **Individual's performance chart:** Enter '@Austin show performance of @<team_member>'. The list of members is diplayed when you type '@'. If the member is part of the team, the bot will ask you the sprint number for which the performance is requested. The available sprint numbers are 20, 21, 22.

* **Velocity graph:** Enter '@Austin show velocity graph'. The velocity graph for all past sprints is displayed.

* **Sprint status:** Enter '@Austin show status of sprint <sprint_id>'. The available sprint IDs are 20, 21, 22. The complete sprint status for that sprint is displayed.

### Use Case 2: Comparison

* **Work done in this sprint with past sprints:** Enter '@Austin compare work done in sprint <sprint_id1> with sprint <sprint_id2>'. The available sprint IDs are 20, 21, 22.

* **Performance of team with respect to previous sprint performance:** Enter '@Austin show team performance'. A comparison chart of the team performance across all past sprints is displayed.

* **Individual performance:** Enter '@Austin compare individual performance in sprint <sprint_id>'. The available sprint IDs are 20, 21, 22. This provides a chart of every individual in the given sprint.

* **Task performance:** Enter '@Austin compare task performance in sprint <sprint_id>'. The available sprint IDs are 20, 21, 22. The time spent on each task is displayed in this chart for the given sprint.

### Use Case 3: Recommendations and Facts

* **Recommend number of task hours:** Enter '@Austin recommend task hours'. The bot will ask how many hours are you planning to assign. Enter the number of hours. By looking at the past trends, the bot will suggest the number of hours that will actually be required for that task.

* **Most number of commits by a user:** Enter '@Austin who has made most number of commits'. The bot will return the username who has performed the most number of commits.

