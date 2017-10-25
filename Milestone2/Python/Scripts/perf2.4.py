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

def parse_json_for_velocity(sprintId):
    file = open(os.path.join(current_path,'../../../AustinBot/mockData.json'), 'r')
    mock = json.load(file)
    sprintIdx = 0
    for idx, sprint in enumerate(mock["sprint"]):
        if sprint["id"] == sprintId:
            sprintIdx = idx

    sprints = mock["sprint"]
    actual = dict()
    expected = dict()
    for story in sprints[sprintIdx]["stories"]:
        for task in story["task"]:
            sum = 0
            for i in task["daily_progress"]: sum = sum + i["work_done"]
            actual[task["task_id"]] = sum
            expected[task["task_id"]] = task["excepted_hours"]

    x = list(actual.keys())
    x=['task '+i for i in x]
    y_actual = list(actual.values())
    y_expected = list(expected.values())
    return [x,y_actual,y_expected]

def plot_velocity(x, y_actual, y_expected):
    trace1 = go.Bar(
    x=x,
    y=y_actual,
    name='Actual hours of work done on assigned Tasks'
    )
    trace2 = go.Bar(
    x=x,
    y=y_expected,
    name='Expected Hours for assigned task'
    )
    data = [trace1, trace2]
    layout = go.Layout(
    barmode='group'
    )
    fig = go.Figure(data=data, layout=layout)
    py.image.save_as(fig, filename=os.path.join(current_path,'../Plots/performance2_4.png'))
    return fig

sprintId = "20"

[x,y_actual,y_expected] = parse_json_for_velocity(sprintId)
fig=plot_velocity(x,y_actual,y_expected)
#plotly.offline.plot(fig, filename='simple-connectgaps.html', image='png')
s3.save_file_to_s3('performance2_4.png')
