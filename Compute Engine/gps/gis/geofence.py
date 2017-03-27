import collections
from gps.gis.algorithms import wn_PnPoly
from gps.services import web

def is_out_of_geofence(point,geofence):
    return True if wn_PnPoly(point,geofence) == 0 else False 

def geoFenceToPoly(geoFence):
    points = geoFence['points']
    od = collections.OrderedDict()
    for point in points:
        od[point['seq']] = (point['latitude'], point['longitude'])
    sorted_dict = dict(od)
    return sorted_dict.values()

def sendOutOfGeoFenceAlert(topicName,message,alertEndPoint):
    url = alertEndPoint
    data = {'topicName':topicName,'message':message}
    web.httpRequest(url, data, 'POST')
    
def checkForGeoFence(gpsData, poly, geoFenceName, topicName,alertEndPoint):
    point = (gpsData['latitude'], gpsData['longitude'])
    if is_out_of_geofence(point, poly):
        message = "Device:" + str(gpsData['device']) + " is out of GeoFence:" + geoFenceName +" and is at location " \
                  "latitude:" + str(gpsData['latitude']) + ",longitude:" +str(gpsData['longitude'])
        sendOutOfGeoFenceAlert(topicName, message, alertEndPoint)

def processGPSData(data,alertEndPoint):
    gpsData = data['gpsData']
    topicName = data['topicName']
    geoFences = data['geoFences']
    for geoFence in geoFences:
        poly = geoFenceToPoly(geoFence)
        geoFenceName = geoFence['name']
        checkForGeoFence(gpsData, poly, geoFenceName, topicName,alertEndPoint)