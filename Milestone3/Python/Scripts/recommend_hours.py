import plotly.plotly as py
import plotly.graph_objs as go
import plotly
import json
from pprint import pprint
import sys
import s3
import os
import server_connect
import pandas as pd
import numpy as np
import requests
from sklearn import linear_model

def parse_json_for_recommend_hours():
    r = server_connect.fetch_data()
    sprints = json.loads(r.data.decode('utf8'))
    users = []
    expected = []
    actual = []
    for sprint in sprints:
        for story in sprint['stories']:
            for task in story['task']:
                users.append(task['user_id'])
                #print(task)
                expected.append(task['excepted_hours'])
                work_done = 0
                for day in task['daily_progress']:
                    work_done += day['work_done']
                actual.append(work_done)
    data = pd.DataFrame({'users':users, 'expected':expected, 'actual':actual})
    data['users'] = data['users'].astype('category')
    return data

def predict_hours(data, query_hours):
    X = data[['expected']]
    Y = data['actual']
    model = linear_model.LinearRegression()
    model.fit(X,Y)
    X_test = pd.DataFrame({'users':[104], 'expected':[query_hours]})
    X_test['users'] = X_test['users'].astype('category')
    model.predict(X_test[['expected']])
    prediction = int(model.predict(X_test[['expected']]))
    return prediction

def main():
    query_hours = sys.argv[1]
    data = parse_json_for_recommend_hours()
    prediction = predict_hours(data, query_hours)
    current_path = os.path.dirname(os.path.realpath("__file__"))
    os.chdir(current_path)
    #Traverse to the Project Root
    #This is done by checking whether the folder AustinBot exits in the current path
    while(not os.path.exists('AustinBot')):
        current_path = os.path.join(current_path, '..')
        os.chdir('..')
    file = open(os.path.join(current_path,'Milestone3/Python/Plots/recommend_hours'), 'w')
    recommendation = "The recommended number of hours is " + str(prediction)
    print(recommendation)
    file.write(recommendation)
    file.close()
    s3.save_file_to_s3('recommend_hours')
    requests.put('https://a0e33791.ngrok.io/api/recommendation/' + str(recommendation))
    print("Completed")

if __name__ == '__main__':
    main()