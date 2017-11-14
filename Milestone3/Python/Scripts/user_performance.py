import plotly.plotly as py
import plotly.graph_objs as go
import plotly
import json
from pprint import pprint
import sys
import s3
import os
import server_connect

def parse_json_for_user_performance(username, sprintId):
    r = server_connect.fetch_data()
    sprints = json.loads(r.data.decode('utf8'))

    #username = "Sandeep"
    #sprintId = "20"
    userPerf = {}
    sprintIdx = 0
    userId = 0
    for idx, sprint in enumerate(sprints):
        if sprint["sprintId"] == sprintId:
            sprintIdx = idx
            for user in sprint["team_member"]:
                if user["user_name"] == username:
                    userId = user["user_id"]


    for story in sprints[sprintIdx]["stories"]:
        for task in story["task"]:
            if task["user_id"] == userId:
                if task["task_id"] not in userPerf:
                    sum = 0
                    for i in task["daily_progress"]: sum = sum + i["work_done"]
                    userPerf[task["task_id"]] = sum

    return userPerf

def plot_user_performance(userPerf):
    plotly.tools.set_credentials_file(username='udeshmu', api_key='qIyD3uwDHJdtNvjSsFyS')
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
    #plotly.offline.plot(fig, filename='simple-connectgaps.html', image='png')

    current_path = os.path.dirname(os.path.realpath("__file__"))
    os.chdir(current_path)
    #Traverse to the Project Root
    #This is done by checking whether the folder AustinBot exits in the current path
    while(not os.path.exists('AustinBot')):
        current_path = os.path.join(current_path, '..')
        os.chdir('..')

    py.image.save_as(fig, filename=os.path.join(current_path,'Milestone3/Python/Plots/user_performance.png'))
    return fig

def main():
    username = sys.argv[1]
    sprintId = sys.argv[2]
    userPerf = parse_json_for_user_performance(username, sprintId)
    fig = plot_user_performance(userPerf)
    s3.save_file_to_s3('user_performance.png')
    print("Completed")

if __name__ == '__main__':
    main()


