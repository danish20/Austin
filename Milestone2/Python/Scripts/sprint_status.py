import json
import pandas as pd
import numpy as np
import plotly.plotly as py
import plotly.graph_objs as go
import plotly
import json
from pprint import pprint
import os
import s3

current_path = os.path.dirname(os.path.realpath("__file__"))
file = open(os.path.join(current_path,'../../../AustinBot/mockData.json'), 'r')
mock = json.load(file)

sprints = mock["sprint"]
query_id="21"

for sprint in sprints:
    if sprint["id"]==query_id:
        current_sprint = sprint

tasks_complete = 0
tasks_incomplete = 0

for story in current_sprint["stories"]:
    for task in story["task"]:
        if task["status"] == "Complete":
            tasks_complete += 1
        else:
            tasks_incomplete += 1

actual_work_done = dict()
for story in current_sprint["stories"]:
    for task in story["task"]:
        for day in task["daily_progress"]:
            try:
                actual_work_done[task["user_id"]]+=day["work_done"]
            except:
                actual_work_done[task["user_id"]]=day["work_done"]

users = list(actual_work_done.keys())
users = ['User '+ str(i) for i in users]

user_hours = list(actual_work_done.values())

tasks_expected_hours = dict()
for story in current_sprint["stories"]:
    try:
        tasks_expected_hours[story["story_id"]] += story["story_hours"]
    except:
        tasks_expected_hours[story["story_id"]] = story["story_hours"]


tasks = list(tasks_expected_hours.keys())

expected_hours_task = list(tasks_expected_hours.values())

tasks = ["Story "+str(i) for i in range(1,len(task)+1)]

tasks_actual_hours = dict()
for story in current_sprint["stories"]:
    for task in story["task"]:
        for work in task["daily_progress"]:
            try:
                tasks_actual_hours[story["story_id"]] += work["work_done"]
            except:
                tasks_actual_hours[story["story_id"]] = work["work_done"]


actual_hours_task = list(tasks_actual_hours.values())

tasks_actual_hours

tasks_expected_hours

plotly.tools.set_credentials_file(username='spilani', api_key='XttFdFvm9v44kZTXOcWR')

fig = {
    'data': [
        {
            'labels': ['Tasks Complete', 'Tasks Incomplete'],
            'values': [tasks_complete, tasks_incomplete],
            'type': 'pie',
            'name': 'Task Status',
            'domain': {'x': [0, .48],
                       'y': [0.1, .49]},
            'hole': 0.4,
            'hoverinfo':'label+percent+name',
            'textinfo':'none'
        },
        {
            'labels': users,
            'values': user_hours,
            'type': 'pie',
            'name': 'User Hours',
            'domain': {'x': [.52, 1],
                       'y': [0.1, .49]},
            'hole': 0.4,
            'hoverinfo':'label+percent+name',
            'textinfo':'none'

        },
        {
            'labels': tasks,
            'values': expected_hours_task,
            'type': 'pie',
            'name': 'Expected Hours',
            'domain': {'x': [0, .48],
                       'y': [.62, 1]},
            'hole': 0.4,
        
            'hoverinfo':'label+percent+name',
            'textinfo':'none'
        },
        {
            'labels': tasks,
            'values': actual_hours_task,
            'type': 'pie',
            'name':'Actual Hours',
            'domain': {'x': [.52, 1],
                       'y': [.62, 1]},
            'hole': 0.4,
            'hoverinfo':'label+percent+name',
            'textinfo':'none'
        }
    ],
    'layout': 
    {
        'title': 'Sprint Status: '+ query_id,
        "annotations": [
            {
                "font": {
                    "size": 20
                },
                "showarrow": False,
                "text": "Task",
                "x": 0.21,
                "y": 0.00
            },
            {
                "font": {
                    "size": 20
                },
                "showarrow": False,
                "text": "User Hours",
                "x": 0.87,
                "y": 0.00
            },
            {
                "font": {
                    "size": 20
                },
                "showarrow": False,
                "text": "Story Expected",
                "x": 0.11,
                "y": 0.58
            },
            {
                "font": {
                    "size": 20
                },
                "showarrow": False,
                "text": "Story Actual",
                "x": 0.87,
                "y": 0.58
            }
        ]
    }
}

py.iplot(fig, filename='pie_chart_subplots')

py.image.save_as(fig, filename=os.path.join(current_path,'../Plots/sprint_status.png'))

s3.save_file_to_s3('sprint_status.png')