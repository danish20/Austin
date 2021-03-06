## Problem Statement
Scrum is one of the leading agile development methodologies used by numerous development teams worldwide. Scrum consists of the following major tasks: 
* Sprint planning, which defines work to be broken down into cycles 
* Daily stand-up meetings, which are time-boxed meetings to keep the other members of the development team updated. 
* Sprint Analytics, which enables the team to better know about past or present sprint statistics and progress.

There are a few issues with conducting daily stand-up meetings. If the team size is large, stand-ups can go over time. Stand-up meetings can be difficult to co-ordinate if team members are working remotely or in different time zones. If a member misses a meeting, there is no history of the meeting for reference. In order to analyze past sprints and be able to better plan out future sprints, certain statistical and visual aids can be leveraged. However, this can become a tedious job for the scrum master or the product owner.  In order to overcome the shortcomings of synchronous  stand-up meetings and also provide automated sprint analytics reports, we propose a slack bot for conducting asynchronous stand-up meetings and sprint management. In asynchronous stand-up meetings, users will be notified at a specified time to answer the three stand-up questions. The users have the freedom of setting this time for notification. There are a few advantages of having asynchronous stand-up meetings.
* It is convenient for remote teams working together. 
* Since a history is maintained, it is possible for anyone who missed a meeting or a new member of the team to get up to speed.

By providing automated analytics report, it reduces the overhead on the scrum master and also helps to better track the progress of sprints and efficiently plan future ones.

## Bot Description
We propose a slack bot named AUSTIN, which achieves the above mentioned objectives. It would be very difficult for a scrum master to conduct asynchronous stand-up meetings and provide sprint analytics. Hence, automating this process using a bot is a good solution. There are three major tasks that our bot carries out: 
* **Sprint Management:** Our bot allows the product owner to add stories and tasks, assign tasks to users, and assign hours to stories. 
* **Conducting stand-up meetings:** While conducting stand-up meeting, our bot will ask three questions: 
	* What did you do yesterday? The bot will list out the tasks assigned to the user. The user has to select which task did he work 	on and for how many hours. There will also be an option for listing activities which are not included in the list of tasks.
	* What will you do today? Again, the tasks assigned to the user will be listed.
	* Any obstacles? The user can mention which team members are dependencies for him.
* **Sprint Analytics:** The bot will provide the following analytics
	* Comparison: Compare the work done in this sprint with the work done in previous sprint in terms of tasks completed, compare sprint velocity of the team, find out top performers of the team by calculating the number of tasks completed by the user, evaluate task performance by comparing what the estimated time for the task was with the actual time taken to complete the task.
	* Charts: Provide visual representation of the past and present sprint activities. These include burndown charts, user perfomance charts depicting which stories were assigned to the user and how much time the user took to complete these, velocity graph, current sprint status showing number of active stories, number of completed stories, average velocity, etc.
	* Recommendations: Provide recommendations like how to improve performance by analyzing the past incomplete stories and recommend re-allocating the hours that were assigned to the worst performer.
	
The entire stand-up meeting record will be saved in a database. The user also has an option to edit a message, and these changes will be reflected in the database. Once the stand up is complete, the bot will show the status to the user and post summary on a common channel. The obstacles(other team members) will also be notified via this common channel. A new channel will be created for every new sprint. Based on the data collected, sprint analytics reports will be generated.

## Use Cases
* **Use Case 1: Generate Sprint Summary:** Users will have the functionality to view summary of each Sprint and see how the team is progressing. Bot is capable of providing summary in various formats and related to different aspects of the sprint. Users can query bot for recommendations based on current and previous sprints, compare different metrics of the sprint and can also see various graphs and charts representing progress of each sprint which can be of following types:  

	* **1:** Burndown Chart
	* **2:** Individual's performance chart
	* **3:** Velocity Graph
	* **4:** Sprint Status

* **Use Case 2: Compare:** Bot can also be used to compare various metrics of the sprint and obtain insights on them. Comparisions can be of following types:

	* **1:** Work done in this sprint with past sprints.
	* **2:** Performance of team with respect to previous sprint performance.
	* **3:** Who performed the most / Best Performer?
	* **4:** Performance based on each task and time spent on it.
		
* **Use Case 3: Recommendations and Facts:** Users can also query bot to provide summary of the sprint which can be presented as recommnedations and facts related to sprint. These may include following: 

	 * **Recommendations**
	 	* **1** How can you improve performance.
	 	* **2** How many hours should be alloted for a task based on past trends.

	 * **Facts** 
	 	* **1** Most Changed File in this sprint.
	 	* **2** Most no of commits/additions made by a user.


## Design Sketches

* ### Wireframe


![Wireframe Image 1](https://github.com/danish20/Austin/blob/master/Milestone1/wireframe1.PNG)


![Wireframe Image 2](https://github.com/danish20/Austin/blob/master/Milestone1/wireframe2.PNG) 


![Wireframe Image 3](https://github.com/danish20/Austin/blob/master/Milestone1/wireframe3.PNG) 


* ### StoryBoard:


![Storyboard 1](https://github.com/danish20/Austin/blob/master/Milestone1/storyboard1.PNG)

![Storyboard 2](https://github.com/danish20/Austin/blob/master/Milestone1/storyboard2.PNG)

![Storyboard 3](https://github.com/danish20/Austin/blob/master/Milestone1/storyboard3.PNG)


## Architecture Design

* ### Component Diagram:

![ComponentDiagram](https://github.com/danish20/Austin/blob/master/Milestone1/ComponentDiagram.png)

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
