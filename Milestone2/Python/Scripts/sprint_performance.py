import json
import pandas as pd
import numpy as np
import plotly.plotly as py
import plotly.graph_objs as go
import plotly
import json
from pprint import pprint
import os
from burndown import parse_json_for_burndown
from burndown import plot_burndown
import s3

current_path = os.path.dirname(os.path.realpath("__file__"))

def plot_sprint_performance(query_id1, query_id2):
    [x,y_20,y_ideal] = parse_json_for_burndown(query_id1)
    [x, y_21, y_ideal] = parse_json_for_burndown(query_id2)
    x = ["Day "+str(i) for i in range(1,len(x)+1)]
    plotly.tools.set_credentials_file(username='udeshmu', api_key='qIyD3uwDHJdtNvjSsFyS')
    trace1 = go.Scatter(
        x = x,
        y = y_20,
        name = '<b>Sprint 20</b>', # Style name/legend entry with html tags
        connectgaps=True
        )
    trace2 = go.Scatter(
        x = x,
        y = y_21,
        name = '<b>Sprint 21</b>', # Style name/legend entry with html tags
        connectgaps=True,
        line = dict(color = ('rgb(205, 12, 24)'),width = 4)
    )
    data = [trace1, trace2]
    fig = dict(data=data)
    py.image.save_as(fig, filename=os.path.join(current_path,'../Plots/sprint_performance.png'))
    return fig

fig=plot_sprint_performance("20", "21")
s3.save_file_to_s3('sprint_performance.png')
