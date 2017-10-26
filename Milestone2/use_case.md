

### Use Cases
Bot is capable of providing analytics related to Sprints in various forms and including different metrics. Following three use cases define those analytics.

**Use Case 1: Generate Sprint Summary**
```
1 Preconditions
   User must have a valid Sprint setup with team members, tasks and stories included in it.

2 Main Flow
   User will request the bot to create one of the following
   
	1:Burndown Chart
	2:Individual's performance chart
	3:Velocity Graph
	4:Sprint Status
	
Upon receiving user's request bot will call helper python script related to the query
to generate chart based on current data. Once this chart is ready our python script 
will upload it to a S3 bucket and return the link to uploaded file. Once bot receives 
a confirmation from python script it will respond to user's query with graph generated. 
    
3 Alternative Flows
  User enters a Sprint ID which does not exists. In this case bot will respond with an error
  and will request to enter a new Sprint ID.
  
```



* **Use Case 2: Compare:** Bot can also be used to compare various metrics of the sprint and obtain insights on them. Comparisions can be of following types:

	* **1:** Work done in this sprint with past sprints.
	* **2:** Performance of team with respect to previous sprint performance.
	* **3:** Who performed the most / Best Performer?
	* **4:** Performance based on each task and time spent on it.
```
1 Preconditions
   There should be atleast 2 Sprints or 2 Users present to perform the comparision.

2 Main Flow
   User will notify bot that he wants to compare some metric related to the sprint and 
   upon receiving user's request bot will call helper python script related to the query
   to generate chart based on current data. Once this chart is ready our python script 
   will upload it to a S3 bucket and return the link to uploaded file. Once bot receives 
   a confirmation from python script it will respond to user's query with graph generated.  

3 Alternative Flows
  Unable to compare performance or work done in particular sprint because of invalid input or insufficient data.
  In this case bot will respond with error message about the situtation. 

```



**Use case 3: Cancelling the meeting**
```
1 Preconditions
There should be a meeting scheduled already.

2 Main Flow
   User will request bot to cancel meeting[S1]. The bot cancels the meeting and notify all the relevant members [S3].

3 Sub flows
•	[S1] The user will tell the bot that he wants to cancel the meeting and give the bot the meeting id.
•	[S2] After getting confirmatory yes from the user the bot cancels the meeting and notify all relevant members.


4 Alternative Flows
  [E1] Not able to cancel the meeting since meeting id is invalid (meeting does not exist).

```
