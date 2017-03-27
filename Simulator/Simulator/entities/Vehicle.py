import json
from utils.web import httpRequest
from entities.Entity import Entity
from entities.Device import Device
class Vehicle(object):
    
    urls = {'all':'http://52.64.162.195:1338/v2/Vehicle',
            'create':'http://52.64.162.195:1338/v2/Vehicle'}
    
    def __init__(self,identity,capacity,device,entity,make,model,registrationNumber):
        self.identity = identity
        self.capacity = capacity
        self.device = device
        self.entity = entity
        self.make = make
        self.model = model
        self.registrationNumber = registrationNumber
    
    @classmethod
    def createVehicle(cls,capacity,device,entity,make,model,registrationNumber):
        url = Vehicle.urls['create']
        data = {'capacity':capacity,'entity':entity.identity,'make':make,'model':model,'registrationNumber':registrationNumber}
        if device:
            data['device'] = device.identity
        response = httpRequest(url, data, 'POST')
        response = json.load(response)
        vehicle = Vehicle(response['id'],response['capacity'],device,entity,response['make'],response['model'],response['registrationNumber']) 
        return vehicle
    
    @classmethod
    def allVehicles(cls):
        url = Vehicle.urls['all']
        response = httpRequest(url)
        response = json.load(response)
        vehicles = []
        for item in response:
            entity = Entity.entityById(item['entity']) if item['entity'] else None
            device = Device.deviceById(item['device']) if item['device'] else None
            vehicle = Vehicle(item['id'],item['capacity'],device,entity,item['make'],item['model'],item['registrationNumber'])
            vehicles.append(vehicle)
        return vehicles

if __name__ == '__main__':
    entity = Entity.entityById(5)
    count = 90
    for i in range(count):
        Vehicle.createVehicle(5, None, entity, 'Hyundai', 'I20', 'REG' + str(i))
        
        