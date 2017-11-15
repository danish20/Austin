import urllib3


def fetch_data():
    http = urllib3.PoolManager()
    r = http.request('GET', 'https://a0e33791.ngrok.io/api/sprint')
    return r