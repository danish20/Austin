import urllib3


def fetch_data():
    http = urllib3.PoolManager()
    r = http.request('GET', 'https://ffadf0e8.ngrok.io/api/sprint')
    return r
