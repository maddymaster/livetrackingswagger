import json
from config.simulator import config
from utils.web import httpRequest

class DeviceType(object):
    
    urls = {'create':'http://52.64.162.195:1338/v2/DeviceType',
            'findById':'http://52.64.162.195:1338/v2/DeviceType/{0}'}
    
    deviceTypes = {}
    
    def __init__(self,identity,deviceType,make,model,sendGPSInfo):
        self.identity = identity
        self.deviceType = deviceType
        self.make = make
        self.model = model
        self.sendGPSInfo = sendGPSInfo
        
    def sendGPSData(self,GPSData):
        self.sendGPSInfo(GPSData)
    
    @classmethod
    def createDeviceType(cls,deviceType,make,model):
        url = DeviceType.urls['create']
        data = {'type':deviceType,'make':make,'model':model}
        response = httpRequest(url, data, 'POST')
        sendGPSInfo = config['DeviceType'][deviceType]
        response = json.load(response)
        deviceType = DeviceType(response['id'],response['type'],response['make'],response['model'],sendGPSInfo) 
        return deviceType

    @classmethod
    def deviceTypeId(cls,id):
        if DeviceType.deviceTypes.get(id) is None:
            url = DeviceType.urls['findById'].format(id)
            response = httpRequest(url)
            response = json.load(response)
            sendGPSInfo = config['DeviceType'][response['type']]
            deviceType = DeviceType(response['id'],response['type'],response['make'],response['model'],sendGPSInfo)
            DeviceType.deviceTypes[id] = deviceType
        return DeviceType.deviceTypes[id]
if __name__ == '__main__':
    DeviceType.createDeviceType('MobileApp', 'Samsung', 'EDGE')
        
        