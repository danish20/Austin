import urllib3
import os

URL = 'http://ec2-54-191-240-173.us-west-2.compute.amazonaws.com:3001/api/'
def fetch_data():
    http = urllib3.PoolManager()
    r = http.request('GET', URL+'sprint')
    return r
