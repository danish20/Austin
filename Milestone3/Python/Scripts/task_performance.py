import json
import pandas as pd
import numpy as np
import plotly.plotly as py
import plotly.graph_objs as go
import plotly
import json
import sys
from pprint import pprint
import os
import s3
import server_connect

current_path = os.path.dirname(os.path.realpath("__file__"))

def parse_json_for_taskComp(sprintId):
    r = server_connect.fetch_data()
    sprints = json.loads(r.data.decode('utf8'))
    sprintIdx = 0
    for idx, sprint in enumerate(sprints):
        if sprint["id"] == sprintId:
            sprintIdx = idx

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

def plot_taskComp(x, y_actual, y_expected):
    trace1 = go.Bar(
    x=x,
    y=y_actual,
    name='Actual work'
    )
    trace2 = go.Bar(
    x=x,
    y=y_expected,
    name='Expected work'
    )
    data = [trace1, trace2]
    layout = go.Layout(
    barmode='group',
    title = 'Task Performance',
    xaxis=dict(
            title='Tasks',
            titlefont=dict(
                family='Courier New, monospace',
                size=18,
                color='#7f7f7f'
            )
        ),
        yaxis=dict(
            title='No. of hours',
            titlefont=dict(
                family='Courier New, monospace',
                size=18,
                color='#7f7f7f'
            )
        )
    )
    fig = go.Figure(data=data, layout=layout)
    current_path = os.path.dirname(os.path.realpath("__file__"))
    os.chdir(current_path)
    #Traverse to the Project Root
    #This is done by checking whether the folder AustinBot exits in the current path
    while(not os.path.exists('AustinBot')):
        current_path = os.path.join(current_path, '..')
        os.chdir('..')
    
    file = open(os.path.join(current_path,'AustinBot/mockData.json'), 'r')
    py.image.save_as(fig, filename=os.path.join(current_path,'Milestone3/Python/Plots/performance2_4.png'))
    return fig

def main():
    sprintId = sys.argv[1]
    [x,y_actual,y_expected] = parse_json_for_taskComp(sprintId)
    #print(x)
    #print(y_actual)
    #print(y_expected)
    fig=plot_taskComp(x,y_actual,y_expected)
    #plotly.offline.plot(fig, filename='simple-connectgaps.html', image='png')
    s3.save_file_to_s3('performance2_4.png')
    print("Completed")

if __name__ == '__main__':
    main()