import json
import pandas as pd
import numpy as np
import plotly.plotly as py
import plotly.graph_objs as go
import plotly
import json
from pprint import pprint

import tinys3

plotly.tools.set_credentials_file(username='udeshmu', api_key='qIyD3uwDHJdtNvjSsFyS')

import os
current_path = os.path.dirname(os.path.realpath("__file__"))

userPerf = {}
with open(os.path.join(current_path,'../../Austin_Mock/mockData.json')) as data_file:
    data = json.load(data_file)
for story in data["sprint"][0]["stories"]:
    for task in story["task"]:
        if task["user_id"] == 103:
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

fig = dict(data=data)
plotly.offline.plot(fig, filename='simple-connectgaps', image='png')

py.image.save_as(fig, filename=os.path.join(current_path,'../Plots/user_performance.png'))


conn = tinys3.Connection('AKIAIHCDSNE43LJH65VA','xEvn6MkKojhZ+znB4YF01D4d2LzkPByUO5i4u+7M',tls=True)

f = open('../Plots/plot_image.png','rb')
conn.upload('user_performance.png',f,'austinbot')