import json
import pandas as pd
import numpy as np
import plotly.plotly as py
import plotly.graph_objs as go
from plotly import tools
import plotly
import json
from pprint import pprint
import os
import s3

current_path = os.path.dirname(os.path.realpath("__file__"))

def parse_json_for_teamTaskStatus():
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
    x=['Team_Sprint '+i for i in x]
    y_complete = list(complete.values())
    y_incomplete = list(incomplete.values())
    return [x,y_complete,y_incomplete]



def createTrace_teamTaskStatus(x, y_complete, y_incomplete):
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
    #layout = go.Layout(
    #barmode='stack'
    #)
    #fig = go.Figure(data=data, layout=layout)
    #py.image.save_as(fig, filename=os.path.join(current_path,'../Plots/perf2.2.png'))
    return data

def parse_json_for_dailyworkdone(sprintId):
    current_path = os.path.dirname(os.path.realpath("__file__"))
    file = open(os.path.join(current_path,'../../../AustinBot/mockData.json'), 'r')
    mock = json.load(file)
    sprints = mock["sprint"]
    for sprint in sprints:
        if sprint["id"]==sprintId:
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
    y = list(work_done_on.values())
    return [x,y]

def parse_json_for_allsprintdaily():
    current_path = os.path.dirname(os.path.realpath("__file__"))
    file = open(os.path.join(current_path,'../../../AustinBot/mockData.json'), 'r')
    mock = json.load(file)
    sprints = mock["sprint"]
    dailyOutputs = dict()
    for sprint in sprints:
        dailyOutputs[sprint["id"]] = parse_json_for_dailyworkdone(sprint["id"])
    return dailyOutputs

def createTrace_dailystatus(dailyOutputs):
    x = ["Day "+str(i) for i in range(1,len(dailyOutputs.values()[0][0])+1)]
    plotly.tools.set_credentials_file(username='udeshmu', api_key='qIyD3uwDHJdtNvjSsFyS')
    traceList = []
    for i in dailyOutputs.keys():
        print dailyOutputs[i][1]
        traceNo = go.Scatter(
            x = x,
            y = dailyOutputs[i][1],
            name = '<b>Team_Sprint </b>'+i,
            connectgaps = True
        )
        traceList.append(traceNo)

    return traceList


def plot_teamPerfComparison(trace1, trace2):
    len1 = len(trace1)
    len2 = len(trace2)
    fig = tools.make_subplots(rows=1, cols=2)
    for i in range(0,len1):
        fig.append_trace(trace1[i], 1, 1)
    for i in range(0,len2):
        fig.append_trace(trace2[i],1,2)
    #fig.append_trace(trace2, 1, 2)
    #fig['layout'].update(height=600, width=600, title='i <3 subplots')
    fig['layout']['xaxis1'].update(title='Teams')
    fig['layout']['xaxis2'].update(title='Days in Sprint')
    fig['layout']['yaxis1'].update(title='Number of tasks')
    fig['layout']['yaxis2'].update(title='Number of hours work done')
    py.image.save_as(fig, filename=os.path.join(current_path, '../Plots/perf2_2.png'))
    plotly.offline.plot(fig, filename='simple-connectgaps.html', image='png')

[x,y_complete,y_incomplete] = parse_json_for_teamTaskStatus()
trace1 = createTrace_teamTaskStatus(x,y_complete,y_incomplete)
dailyOutputs =  parse_json_for_allsprintdaily()
trace2 = createTrace_dailystatus(dailyOutputs)
plot_teamPerfComparison(trace1,trace2)
s3.save_file_to_s3('perf2_2.png')