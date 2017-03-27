import json
import time
from datetime import datetime
from threading import Thread
from utils.web import httpRequest
from gps.directions import getDirections, decode

class Trip(Thread):
    
    urls = {'create':'http://52.64.162.195:1338/v2/Trip',
            'update':'http://52.64.162.195:1338/v2/Trip/{0}'}
    
    def __init__(self,identity,assignedTime,device,driver,endLocation,endTime,entity,startTime,startLocation,status,vehicle):
        Thread.__init__(self)
        self.identity = identity
        self.assignedTime = assignedTime
        self.device = device
        self.driver = driver
        self.endLocation = endLocation
        self.endTime = endTime
        self.entity = entity
        self.startTime = startTime
        self.startLocation = startLocation
        self.status = status
        self.vehicle = vehicle
    
    def run(self):
        start = str(self.startLocation.latitude) + ', ' + str(self.startLocation.longitude)
        end = str(self.endLocation.latitude) + ', ' + str(self.endLocation.longitude)
        directions = getDirections(start,end)
        self.update({'startTime':datetime.now(),'status':'Started'})
        print "Trip " + str(self.identity) + "started."
        if directions and directions['legs']:
            steps = directions['legs'][0]['steps']
            for step in steps:
                duration = step['duration']['value']/2
                points = decode(step['polyline']['points'])
                interval = duration/len(points)
                for point in points:
                    self.device.deviceType.sendGPSInfo({'device':self.device.identity,
                                                        'latitude':point[1],
                                                        'longitude':point[0],
                                                        'GPSDateTime':datetime.now()})
                    time.sleep(interval)
        self.update({'endTime':datetime.now(),'status':'Completed'})
        print "Trip " + str(self.identity) + "completed."
        
    def update(self,data):
        url = Trip.urls['update']
        url = url.format(self.identity)
        response = httpRequest(url, data, 'PUT')
        response = json.load(response)
        self.startTime = response['startTime']
        self.endTime = response['endTime']
        self.status = response['status']
    
    @classmethod
    def createTrip(cls,assignedTime,device,driver,endLocation,endTime,entity,startTime,startLocation,status,vehicle):
        url = Trip.urls['create']
        data = {'assignedTime':assignedTime,'device':device.identity,'driver':driver.identity,'endLocation':endLocation.identity,
                'entity':entity.identity,'startLocation':startLocation.identity,'status':status,'vehicle':vehicle.identity}
        if startTime:
            data['startTime'] = startTime
        if endTime:
            data['endTime'] = endTime
        response = httpRequest(url, data, 'POST')
        response = json.load(response)
        trip = Trip(response['id'],response['assignedTime'],device,driver,endLocation,response['endTime'],entity,response['startTime'],
                            startLocation,response['status'],vehicle) 
        return trip