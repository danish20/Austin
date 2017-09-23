## Problem Statement
Scrum is one of the leading agile development methodologies used by numerous development teams worldwide. There are two major activities in Scrum: sprint planning, which defines work to be broken down into cycles and daily stand-up meetings, which are time-boxed meetings to keep the other members of the development team updated. However, there are a few issues with conducting daily stand-up meetings. If the team size is large, stand-ups can go over time. Stand-up meetings can be difficult to co-ordinate if team members are working remotely or in different time zones. Also, if a member misses a meeting, there is no history of the meeting for reference. In order to overcome the shortcomings of synchronous  stand-up meetings, we propose a slack bot for conducting asynchronous stand-up meetings and sprint management. In asynchronous stand-up meetings, users will be notified at a specified time to answer the three stand-up questions. The users have the freedom of setting this time for notification. There are a few advantages of having asynchronous stand-up meetings.
* It is convenient for remote teams working together. 
* Since a history is maintained, it is possible for anyone who missed a meeting or a new member of the team to get up to speed.

## Bot Description
Keeping all the advantages of asynchronous stand-up meetings in mind, we propose a slack bot AUSTIN, which achieves all the above mentioned objectives. There are two major tasks that our bot carries out: 
* **Sprint Management:** Our bot allows the product owner to add stories and tasks, assign tasks to users, and assign hours to stories. 
* **Conducting stand-up meetings:** While conducting stand-up meeting, our bot will ask three questions: 
	* What did you do yesterday? The bot will list out the tasks assigned to the user. The user has to select which task did he work 	on and for how many hours. There will also be an option for listing activities which are not included in the list of tasks.
	* What will you do today? Again, the tasks assigned to the user will be listed.
	* Any obstacles? The user can mention which team members are dependencies for him.
	
The entire stand-up meeting record will be saved in a database. The user also has an option to edit a message, and these changes will be reflected in the database. Once the stand up is complete, the bot will show the status to the user and post summary on a common channel. The obstacles(other team members) will also be notified via this common channel. A new channel will be created for every new sprint. Based on the data collected, user reports can be generated after the end of every sprint. These reports will include a graphical representation of user's performance, like the tasks completed, the tasks left incomplete, number of hours worked, etc.

## Use Cases

* **Use Case 1: Setup Sprint:** Before the start of every sprint Product Owner will create a new channel to setup the sprint where daily status of each member will be posted. To setup the Sprint Product Owner will provide following parameters:
	* **Sprint Name:** It can be anything based on the discretion of Product Owner. Usually Sprint N format is used or Sprint <DATE> and SPRINT <PURPOSE> is used.
	* **Sprint Duration** It is the time of each sprint period which is usually 2-3 weeks depending on the team and organization.
	* **User Stories** A user story is a tool used in Agile software development to capture a description of a software feature from an end-user perspective. The user story describes the type of user, what they want and why. A user story helps to create a simplified description of a requirement. This will be defined at the start of Sprint Planning while creating a new Sprint.
	* **Team Members** Team members include the participants in Scrum sprint which can be a part of single team working on a particular project. 

Once the user enter these details a slack channel will be created where reports of each user will be posted based on their daily work report.

* **Use Case 2: Conduct Stand-Up:** After the Sprint has been setup, each team member will receive a message from our bot at a designated time with the following questions:

	* What did you do yesterday?
	* What will you do today?
	* Do you have any road blocks?

Once user provide answer to these question, their response will be posted in the Sprint channel to update everyone else on the team. Users will also have the facility to schedule their own sprint time and can snooze the Sprint reporting reminder upto 3 times with a maximum duration of 30 mins.

* **Use Case 3: Generate Sprint Summary:** Users will have the functionality to view summary of each Sprint and see how the team is progressing. To use this feature user will ask bot to provide summary with a Sprint name and based on that request user will be provided options to choose the format in which they want summary. User may choose to have summary in text format, bar/line graph or summary of an individual team member and summary of whole team. 

___________

## Design Sketches

* ### Wireframe


![Wireframe Image 1](https://github.ncsu.edu/dsuri/CSC510-Project/blob/master/Milestone1/wireframe1.PNG)


![Wireframe Image 2](https://github.ncsu.edu/dsuri/CSC510-Project/blob/master/Milestone1/wireframe2.PNG) 


* ### StoryBoard:


![Storyboard 1](https://github.ncsu.edu/dsuri/CSC510-Project/blob/master/Milestone1/storyboard1.PNG)

![Storyboard 2](https://github.ncsu.edu/dsuri/CSC510-Project/blob/master/Milestone1/storyboard2.PNG)


## Architecture Design

* ### Component Diagram:

![ComponentDiagram](https://github.ncsu.edu/dsuri/CSC510-Project/blob/master/Milestone1/ComponentDiagram.png)

* ### Architectural Components:

	* **Slack:** It will be used as primary interface to interact with the bot. Users will have slack channels for sprints where daily updates will be posted and bot will fetch daily report from user through chat windows. 

	* **Scrum Master Bot** This is the central component of our bot which will be a server running node. Through this all the communication between slack and database will be made. Server will be configured to continuously listen through the slack for any updates and will also be programmed to post messages to slack channels, user's direct message windows and provide detailed performance analysis.

	* **Database System** Database will be the backbone of our system. We will store user responses and sprint details in the database which will provide an interface for our server to query it. Database will be based on NoSQL using MongoDB.

* ### Constraints:
	* **Missing User Authentication:** As out bot is based on Slack, which allows any member of the team to creat and edit a sprint without requiring any authentication model based on the role of user in that organization.

	* **Limitation of Report Questions:** To evaluate the report each user is asked certain fixed set of questions which are limited in their approach to fetch detailed information regarding to the progress of the sprint.


* ### Architectural and Design Pattern: 
	* To efficiently conduct standups and maintain the sprint progress, Austin needs to pass messages across the server and the database. The standup inputs received from a user should be persisted in the database and the data should also be retrieved to enable progress tracking. This would require following an **Object Oriented approach** with a **Call and Return** design.
	* In order to generate user or team report, Austin needs to have a context of which user it is interacting with and where this interaction is taking place. The **Space Reactor** design pattern fits this purpose perfectly. Using this pattern, Austin will have no memory of its own, but it will maintain a context of where it is and which user it is interacting with.
