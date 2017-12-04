# REPORT

## Problem solved by Austin Bot

Scrum is one of the leading agile development methodologies used by numerous development teams worldwide. Scrum consists of the following major tasks: 
* Sprint planning, which defines work to be broken down into cycles 
* Daily stand-up meetings, which are time-boxed meetings to keep the other members of the development team updated. 
* Sprint Analytics, which enables the team to better know about past or present sprint statistics and progress.

In recent times, there has been an increase in the demand for asynchronous stand-up meetings. As the organizations have grown bigger
and spread across the globe, it is difficult for the members to set a hard timeline to conduct stand-up meetings. Another 
advantage of asynchronous meetings is that since a history is maintained, it is possible for anyone who missed a 
meeting or a new member of the team to get up to speed. However, looking at a broader picture, certain tools can be 
used to carry out analytics on the sprint data. By providing automated analytics report, it reduces the overhead 
on the scrum master and also helps to better track the progress of sprints and efficiently plan future ones.


Keeping in mind the role analytics plays in different fields, we decided to create Austin Bot, which provides a visual and 
an analytical insight into the process of sprint. The bot aims at providing the following analytics:
 * Comparison: Compare the work done in this sprint with the work done in previous sprint in terms of tasks completed, compare sprint velocity of the team, find out top performers of the team by calculating the number of tasks completed by the user, evaluate task performance by comparing what the estimated time for the task was with the actual time taken to complete the task.
 * Charts: Provide visual representation of the past and present sprint activities. These include burndown charts, user perfomance charts depicting which stories were assigned to the user and how much time the user took to complete these, velocity graph, current sprint status showing number of active stories, number of completed stories, average velocity, etc.
 * Recommendations: Provide recommendations like how to improve performance by analyzing the past incomplete stories and recommend re-allocating the hours that were assigned to the worst performer.
 
 Essentially, the bot aims at solving the problem of sprint planning. Often times, it is the case that during sprint planning, 
 we do not know how a particular member will perform the tasks, or how fast a given team completes their stories. It would be very 
 helpful for the scrum master and the product manager to have at least some insight as to how the sprint will pan out.
 
 So, in summary, Austin bot aims to leverage the power of analytics in order to gain insights from past sprints and help planning 
 the future sprints.
 
 ## Primary Features
 
 The primary features of Austin Bot can be divided into three categories:
 
* **Sprint Summary:** Bot provides the functionality to view summary of each Sprint and see how the team is progressing. Users can ask the bot to show charts based on current and previous sprints, compare different metrics of the sprint and can also see various graphs and charts representing progress of each sprint which can be of following types:
	* **Burndown Chart:** A burndown chart helps to capture the daily progress made in a sprint. It plots the number of hours left against the days of the sprint. The ideal line in a burndown chart starts at the number of hours allocated for the sprint, on day 1 and ends at 0 on the last day. This line is used as a reference. If the actual line is below the ideal line, it means that progress is achieved at a faster rate than expected. If the actual line crosses the ideal line, it means that the progress is slower than expected.
	
	* **Individual's performance chart:** The user performance chart displays the number of hours spent by the user on all the tasks in a given sprint. Enter '@Austin show performance of @<team_member>'. The list of members is diplayed when you type '@'. If the member is part of the team, the bot will ask you the sprint number for which the performance is requested.
	
	* **Velocity Graph:** The velocity graph displays the proportion of complete and incomplete tasks for all the sprints. Enter '@Austin show velocity graph'. The velocity graph for all past sprints is displayed.
	
	* **Sprint Status:** The sprint status summarizes and visually shows the number of hours expected for task completion, number of hours actually required, the number of tasks complete/incomplete, the number of hours spent by every user. Enter '@Austin show status of sprint <sprint_id>'. The complete sprint status for that sprint is displayed.
 
* **Comparison:** Bot can also be used to compare various metrics of the sprint and obtain insights on them. Comparisions can be of following types:
	* **Work done in this sprint with past sprints:** This displays a burndown for 2 sprints which we want to compare. Based on both the burndown lines, we can compare the progress of 2 sprints. Enter '@Austin compare work done in sprint <sprint_id1> with sprint <sprint_id2>'.
	
	* **Performance of team with respect to previous sprint performance:** This displays a comparison of the number of tasks completed by each team and also compares the daily progress. Enter '@Austin show team performance'.
	
	* **Individual performance:** This displays the number of hours spent by the user as compared to the expected number of hours. Enter '@Austin compare individual performance in sprint <sprint_id>'. We can deduce a comparison based on the given graph.
	
	* **Performance based on each task and time spent on it:** This plots a graph for every task in the sprint and displays the actual vs expected hours. Enter '@Austin compare task performance in sprint <sprint_id>'.
 
* **Recommendations/Facts:** 
 	* **Recommend Task hours:** While allocating the number of hours to a particular task, it would be helpful to know the past trends and assign hours accordingly. The bot does exactly this. It studies the past trends for task completion and recommends how many hours should be allocated to the task. It takes as input an initial estimate and recommends what the actual number should be.
	
    * **Most number of commits:** This displays the name of the user who has made the most number of commits and also the number of commits made. Enter '@Austin who has made most number of commits'.
    
## Reflection on the Development process and Project

We started this project with an aim of building a bot, in order to solve a software engineering problem. We decided to choose Slack as a platform to deploy our bot keeping in mind its rising popularity among tech companies. We explored a lot of ideas for building our bot. The rising importance of analytics in different streams made us finalize this project idea.

In Milestone 1, we designed use cases which were centred around this issue of using analytics to solve the problem of efficient sprint planning. During this phase, we had to understand the different aspects of the project like problem definition, limiting the scope, requirement gathering.

In Milestone 2, we had to come up with the bot implementation using mocked data. The first step here was to decide the technology stack. We went ahead with NodeJs for building the different processes of the bot, Python in the backend to create the analytics environment and AWS S3 for storing the output images. After building the individual modules seperately, the major challenge was how to integrate these different modules. The interfacing between Slack and python created quite a few problems initially. We explored different solutions and went ahead with the best possible solution we could find. The interfacing between S3 and Slack again created a few issues, with Slack caching the images and showing the same preview for the same command with different parameters. The temporary solutions we could find was to clear the Slack cache before issuing the same command again.

In Milestone 3, we implemented the service part of the bot. We moved our data to an actual mongo database. The bot used the data directly from MongoDB using REST endpoints published through an Express server. The python scripts were also configured to pull the data from these endpoints.

## Limitations and Future Work

Following are the limitations of Austin Bot, on which we would like to work in the future:

* There is no functionality to create a sprint. We would like to create this functionality where a product manager can create a sprint. 

* Austin Bot does not have any functionality to conduct standup meetings. We would like to add this functionality where the bot pings the users at user specified time and ask the three standup questions. The bot would then store the responses in Mongo DB.

* Since Slack is a web based application, it caches data related to pages for a certain period of time. When a user enters the same command, but with different parameters, the returned URL is unfurled to the same cached image which was fetched previously. However, if you will right click on that image and open link in browser you can see the actual image for respective sprints. This is one issue which we would like to eliminate. A temporary solution is to clear the cache before issuing the same command again. 

* Currently, the plots and graphs returned are static. In the future, we would like to integrate more interactive charts using tools like D3.js. Also, currently the plots are generated using the 'plotly' library in python. This library allows a limited number of requests to be made per day. The temporary solution was to use multiple user credentials. However, in order to scale out, we would need a more robust approach.
  
 
