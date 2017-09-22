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

![ComponentDiagram](https://github.ncsu.edu/dsuri/CSC510-Project/blob/master/Milestone1/ComponentDiagram.png)

* ### Architectural Components:
	* **User:**

* ### Architectural Pattern: 
To efficiently conduct standups and maintain the sprint progress, Austin needs to pass messages across the server and the database. The standup inputs received from a user should be persisted in the database and the data should also be retrieved to enable progress tracking. This would require following an **Object Oriented approach** with a **Call and Return** design.

* ### Constraints:
	* **Missing User Authentication:** As out bot is based on Slack, which allows any member of the team to creat and edit a sprint without requiring any authentication model based on the role of user in that organization.

	* **Limitation of Report Questions:** To evaluate the report each user is asked certain fixed set of questions which are limited in their approach to fetch detailed information regarding to the progress of the sprint.


