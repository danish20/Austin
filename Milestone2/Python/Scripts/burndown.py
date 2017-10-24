import json
import pandas as pd
import numpy as np
import plotly.plotly as py
import plotly.graph_objs as go
import plotly
import json
from pprint import pprint
import os

current_path = os.path.dirname(os.path.realpath("__file__"))

def parse_json_for_burndown(query_id):
    file = open(os.path.join(current_path,'../../Austin_Mock/mockData.json'), 'r')
    mock = json.load(file)
    sprints = mock["sprint"]
    for sprint in sprints:
        if sprint["id"]==query_id:
            current_sprint = sprint
    total_hours = 0
    for story in current_sprint["stories"]:
        total_hours += story["story_hours"]
    #print(current_sprint)
    work_done_on = dict()
    for story in current_sprint["stories"]:
        for task in story["task"]:
            for work in task["daily_progress"]:
                try:
                    work_done_on[work["date"]] += work["work_done"]
                except:
                    work_done_on[work["date"]] = work["work_done"]
    #print(work_done_on)
    #print(total_hours)
    #print(current_sprint)

    x = list(work_done_on.keys())
    y = []
    hours_left = total_hours
    for date in work_done_on:
        hours_left -= work_done_on[date]
        y.append(hours_left)
    #print(x)
    #print(y)
    return [x,y]

def plot_burndown(x, y):
    plotly.tools.set_credentials_file(username='udeshmu', api_key='qIyD3uwDHJdtNvjSsFyS')
    trace1 = go.Scatter(
        x = x,
        y = y,
        name = '<b>No</b> Gaps', # Style name/legend entry with html tags
        connectgaps=True
    )
    data = [trace1]
    fig = dict(data=data)
    py.image.save_as(fig, filename=os.path.join(current_path,'../Plots/burndown.png'))
    return fig

[x,y] = parse_json_for_burndown(20)
fig=plot_burndown(x,y)