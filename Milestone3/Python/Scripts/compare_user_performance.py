import json
import pandas as pd
import numpy as np
import plotly.plotly as py
import plotly.graph_objs as go
import plotly
import json
from pprint import pprint
import os
import sys
import s3

def parse_json_for_compare_user_performance(query_id):
    current_path = os.path.dirname(os.path.realpath("__file__"))
    os.chdir(current_path)
    #Traverse to the Project Root
    #This is done by checking whether the folder AustinBot exits in the current path
    while(not os.path.exists('AustinBot')):
        current_path = os.path.join(current_path, '..')
        os.chdir('..')
    
    file = open(os.path.join(current_path,'AustinBot/mockData.json'), 'r')
    mock = json.load(file)
    sprints = mock["sprint"]
    for sprint in sprints:
        if sprint["id"]==query_id:
            current_sprint = sprint

    expected = dict()
    actual_work_done = dict()

    for story in current_sprint["stories"]:
        for task in story["task"]:
            if task["status"]=="Complete":
                try:
                    expected[task["user_id"]]+=task["excepted_hours"]
                except:
                    expected[task["user_id"]]=task["excepted_hours"]
                for day in task["daily_progress"]:
                    try:
                        actual_work_done[task["user_id"]]+=day["work_done"]
                    except:
                        actual_work_done[task["user_id"]]=day["work_done"]


    y_expected=list(expected.values())
    y_actual_work_done=list(actual_work_done.values())
    x=list(expected.keys())
    return [x, y_expected, y_actual_work_done]

def plot_compare_user_performance(x, y_expected, y_actual_work_done):
    plotly.tools.set_credentials_file(username='spilani', api_key='XttFdFvm9v44kZTXOcWR')

    current_path = os.path.dirname(os.path.realpath("__file__"))
    os.chdir(current_path)
    #Traverse to the Project Root
    #This is done by checking whether the folder AustinBot exits in the current path
    while(not os.path.exists('AustinBot')):
        current_path = os.path.join(current_path, '..')
        os.chdir('..')

    trace1 = go.Bar(
        x=x,
        y=y_expected,
        name='Expected Hours'
    )
    trace2 = go.Bar(
        x=x,
        y=y_actual_work_done,
        name='Actual hours'
    )
    data = [trace1, trace2]
    layout = go.Layout(
        title = 'User Performance Comparison',
        barmode='group',
        xaxis=dict(
            title='User IDs',
            titlefont=dict(
                family='Courier New, monospace',
                size=18,
                color='#7f7f7f'
            )
        ),
        yaxis=dict(
            title='Hours',
            titlefont=dict(
                family='Courier New, monospace',
                size=18,
                color='#7f7f7f'
            )
        )
    )
    fig = go.Figure(data=data, layout=layout)
    py.image.save_as(fig, filename=os.path.join(current_path,'Milestone3/Python/Plots/compare_user_performance.png'))
    s3.save_file_to_s3('compare_user_performance.png')

def main():
    query_id = sys.argv[1]
    [x, y_expected, y_actual_work_done] = parse_json_for_compare_user_performance(query_id)
    fig = plot_compare_user_performance(x, y_expected, y_actual_work_done)
    s3.save_file_to_s3('compare_user_performance.png')
    print("Completed")

if __name__ == '__main__':
    main() 

