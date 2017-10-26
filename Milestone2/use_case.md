

### Use Cases
Bot is capable of providing analytics related to Sprints in various forms and including different metrics. Following three use cases define those analytics.

**Use Case 1: Generate Sprint Summary**
```
1 Preconditions
   User must have a valid Sprint setup with team members, tasks and stories included in it.

2 Main Flow
   User will request the bot to create one of the following
   
    * **1:** Burndown Chart
	  * **2:** Individual's performance chart
	  * **3:** Velocity Graph
	  * **4:** Sprint Status
    
  


3 Sub flows
•	[S1] User 1 will alert the bot. Bot requests for the list of attendees which the user provides
  (User provides /meeting command with @username1, @username2 list). The user will provide meeting
  duration and date of the meeting upon bot’s request (Eg. 1 hour, tomorrow).
•	[S2] The bot finds the most suitable time and location for the meeting and sets up the meeting
  at the most feasible time as per instructions as waits for confirmation from the user.
•	[S3] Upon confirmation the bot creates the meeting and send emails/posts link.

4 Alternative Flows
  [E1] Not able to find suitable because no team members are available or all meeting rooms are booked

```



**Use case 2: Add a member to the meeting**
```
1 Preconditions
   User must have google calendar api tokens in setup in the system and there should be a meeting scheduled already.

2 Main Flow
   User will notify bot that he wants to add a new set of attendees to the meeting [S1]. The bot adds this new set of
   members to the already created meeting and notify all the attendees [S2].

3 Sub flows
•	[S1] The user will tell the bot that he wants to add a new member or a set of members to the meeting which was created
  earlier. He provides the username of these new attendees. (Eg. Add a new member. @username 3, username 4)
•	[S2] The bot adds this single member or these members and notify all relevant members.

4 Alternative Flows
  [E1] Not able to adjust this new member into the meeting because of the schedule clash. Notify the user
  that the meeting has to rescheduled.

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
