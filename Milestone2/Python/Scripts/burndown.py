import json
import plotly.plotly as py
import plotly.graph_objs as go
import plotly
import json
import os
import s3
import sys

current_path = os.path.dirname(os.path.realpath("__file__"))

def parse_json_for_burndown(query_id):
    current_path = os.path.dirname(os.path.realpath("__file__"))
    file = open(os.path.join(current_path,'../../../AustinBot/mockData.json'), 'r')
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
    each_day = total_hours/len(x)
    hours_left = total_hours
    y_ideal = []
    for i in x:
        hours_left -= each_day
        y_ideal.append(hours_left)
    return [x,y, y_ideal]

def plot_burndown(x, y, y_ideal):
    plotly.tools.set_credentials_file(username='udeshmu', api_key='qIyD3uwDHJdtNvjSsFyS')
    trace1 = go.Scatter(
        x = x,
        y = y,
        name = '<b>Burndown</b>', # Style name/legend entry with html tags
        connectgaps=True
    )
    trace2 = go.Scatter(
        x = x,
        y = y_ideal,
        name = '<b>Ideal</b>', # Style name/legend entry with html tags
        connectgaps=True,
        line = dict(color = ('rgb(205, 12, 24)'))
    )
    data = [trace1, trace2]
    fig = dict(data=data)
    py.image.save_as(fig, filename=os.path.join(current_path,'../Milestone2/Python/Plots/burndown.png'))
    return fig

def main():
    query_id = "20"

    [x,y,y_ideal] = parse_json_for_burndown(query_id)
    fig=plot_burndown(x,y,y_ideal)
    s3.save_file_to_s3('burndown.png')
    print("comp")

if __name__ == '__main__':
    main()   
