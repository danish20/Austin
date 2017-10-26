## MILESTONE 2 : BOT


## 3 Use Cases

### Please find 3 use cases in following file
#### https://github.ncsu.edu/dsuri/Austin/blob/master/Milestone2/use_case.md

## Mocking

  For Austin-bot, we will use MongoDb for data processing. For this milestone, we have mocked the sprint data using JSON objects. We have created mockData.JSON file for mocking sprint data and sprint details. This JSON consists of sprint details as sprint_id, sprint_name, sprint_start_date, sprint_end_date,team member details who are working on current sprint and stories within each sprint. Each story contains story id, user deatails whos working on the story and task details of the tasks under that story. And we have mocked this data and used in our bot.js for read and write purpose. We have used array of sprint data which we imported in bot.js and python scripts to perform all the analytics operations.
  When user asks for any analytics options to perform using sprint id or user name, we are calling pyhton scripts which parse the data in mockdata JSON file and then specific request is fullfiled by generating graph based on mock data.

  Please find mockData.json file here
  https://github.ncsu.edu/dsuri/Austin/blob/master/AustinBot/mockData.json

## Bot Implementation

  Austin bot is created to help Agile teams conduct Scrum meetings in an asynchrounous fashion. The bot is enabled with analytics feature to provide better insights about the team performance in each sprint and overall.
  
  Please find bot.js and other files below
  https://github.ncsu.edu/dsuri/Austin/tree/master/AustinBot


## Selenium testing of each use case

  Please find selenium test script for each use case below :
  https://github.ncsu.edu/dsuri/Austin/tree/master/Milestone2/Selenium
	
## Task Tracking -- WORKSHEET.md

  We have Trello Cards for Task tracking.
  Please find worksheet at https://github.ncsu.edu/dsuri/Austin/blob/master/Milestone2/WORKSHEET.md

## Screencast

  Please download the screencasts using the links below:

  Use Case 1: https://github.ncsu.edu/dsuri/Austin/blob/master/Milestone2/Screencasts/usecase_1.mp4
  
  YOUTUBE LINK : https://youtu.be/DmHsEtWw3Lw

  Use Case 2: https://github.ncsu.edu/dsuri/Austin/blob/master/Milestone2/Screencasts/usecase_2.mp4
  
  YOUTUBE LINK : https://youtu.be/OWtRAb9sxUQ

  Use Case 3: https://github.ncsu.edu/dsuri/Austin/blob/master/Milestone2/Screencasts/usecase_3.mp4
  
  YOUTUBE LINK : https://youtu.be/Tb6_KsgueXc
