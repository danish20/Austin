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

def parse_json_for_velocity():
    file = open(os.path.join(current_path,'../../../AustinBot/mockData.json'), 'r')
    mock = json.load(file)
    sprints = mock["sprint"]
    complete = dict()
    incomplete = dict()
    for sprint in sprints:
        complete[sprint["id"]] = 0
        incomplete[sprint["id"]] = 0
        for story in sprint["stories"]:
            for task in story["task"]:
                if task["status"] == "Complete":
                    complete[sprint["id"]] += 1
                elif task["status"] == "Active":
                    incomplete[sprint["id"]] += 1
    x = list(complete.keys())
    x=['Sprint '+i for i in x]
    y_complete = list(complete.values())
    y_incomplete = list(incomplete.values())
    return [x,y_complete,y_incomplete]

def plot_velocity(x, y_complete, y_incomplete):
    trace1 = go.Bar(
    x=x,
    y=y_complete,
    name='Complete Tasks'
    )
    trace2 = go.Bar(
    x=x,
    y=y_incomplete,
    name='Incomplete Tasks'
    )
    data = [trace1, trace2]
    layout = go.Layout(
    barmode='stack'
    )
    fig = go.Figure(data=data, layout=layout)
    py.image.save_as(fig, filename=os.path.join(current_path,'../Plots/velocity.png'))
    return fig

[x,y_complete,y_incomplete] = parse_json_for_velocity()
fig=plot_velocity(x,y_complete,y_incomplete)
s3.save_file_to_s3('velocity.png')