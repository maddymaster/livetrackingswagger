from utils.web import httpRequest

def adomRestApi(gpsData):
    url = 'http://52.64.162.195:1338/v2/GPS'
    httpRequest(url,data=gpsData,method='POST')