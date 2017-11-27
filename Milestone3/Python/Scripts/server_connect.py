import urllib3
import os

URL = os.environ['EXPRESS_URL'] + ':3001/' + 'api/'
def fetch_data():
    http = urllib3.PoolManager()
    r = http.request('GET', URL+'sprint')
    return r
