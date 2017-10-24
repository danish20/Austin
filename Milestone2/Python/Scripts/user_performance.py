import json
# import pandas as pd
# import numpy as np
import plotly.plotly as py
import plotly.graph_objs as go
import plotly
import json
from pprint import pprint
import sys
import s3
import os

current_path = os.path.dirname(os.path.realpath("__file__"))



username = "Sandeep"
sprintId = "20"

plotly.tools.set_credentials_file(username='udeshmu', api_key='qIyD3uwDHJdtNvjSsFyS')

userPerf = {}
with open(os.path.join(current_path,'../../../AustinBot/mockData.json')) as data_file:
    data = json.load(data_file)


sprintIdx = 0
userId = 0
for idx, sprint in enumerate(data["sprint"]):
    if sprint["id"] == sprintId:
        sprintIdx = idx
        for user in sprint["team_member"]:
            if user["user_name"] == username:
                userId = user["user_id"]


for story in data["sprint"][sprintIdx]["stories"]:
    for task in story["task"]:
        if task["user_id"] == userId:
            if task["task_id"] not in userPerf:
                sum = 0
                for i in task["daily_progress"]: sum = sum + i["work_done"]
                userPerf[task["task_id"]] = sum

trace1 = go.Bar(
    x=list(userPerf.keys()),
    y=list(userPerf.values()),
    name = '<b>No</b> Gaps' # Style name/legend entry with html tags
)

data=[trace1]

layout = go.Layout(
    title='User Performance Chart',
    xaxis=dict(
        title='Task Ids',
        titlefont=dict(
            family='Courier New, monospace',
            size=18,
            color='#7f7f7f'
        )
    ),
    yaxis=dict(
        title='No. of Hours',
        titlefont=dict(
            family='Courier New, monospace',
            size=18,
            color='#7f7f7f'
        )
    )
)
fig = dict(data=data, layout = layout)
plotly.offline.plot(fig, filename='simple-connectgaps.html', image='png')

py.image.save_as(fig, filename=os.path.join(current_path,'../Plots/user_performance.png'))
s3.save_file_to_s3('user_performance.png')


