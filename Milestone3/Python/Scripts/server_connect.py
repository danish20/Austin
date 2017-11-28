import urllib3
import os

URL = 'http://34.209.179.187:3001/api/'
def fetch_data():
    http = urllib3.PoolManager()
    r = http.request('GET', URL+'sprint')
    return r
