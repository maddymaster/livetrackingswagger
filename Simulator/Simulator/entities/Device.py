import json
from utils.web import httpRequest
from entities.DeviceType import DeviceType

class Device(object):
    urls = {'all':'http://52.64.162.195:1338/v2/Device',
            'create':'http://52.64.162.195:1338/v2/Device',
            'findById':'http://52.64.162.195:1338/v2/Device/{0}'}
    
    devices = {}
    
    def __init__(self,identity,deviceType,entity,IMEI,SIM,UIN):
        self.identity = identity
        self.deviceType = deviceType
        self.entity = entity
        self.IMEI = IMEI
        self.SIM = SIM
        self.UIN = UIN
    
    @classmethod
    def createDevice(cls,deviceType,entity,IMEI,SIM,UIN):
        url = Device.urls['create']
        data = {'SIM':SIM,'UIN':UIN,'IMEI':IMEI,'deviceType':deviceType.identity}
        if entity:
            data['entity'] = entity.identity
        response = httpRequest(url, data, 'POST')
        response = json.load(response)
        device = Device(response['id'],deviceType,response['entity'],response['IMEI'],response['SIM'],
                            response['UIN']) 
        return device
    
    @classmethod
    def allDevices(cls):
        url = Device.urls['all']
        response = httpRequest(url)
        response = json.load(response)
        devices = []
        for item in response:
            deviceType = DeviceType.deviceTypeId(item['deviceType'])
            device = Device(item['id'],deviceType,item['entity'],item['IMEI'],item['SIM'],
                            item['UIN'])
            devices.append(device)
        return devices
    
    @classmethod
    def deviceById(cls):
        if Device.devices.get(id) is None:
            url = Device.urls['findById'].format(id)
            response = httpRequest(url)
            response = json.load(response)
            deviceType = DeviceType.deviceTypeId(response['deviceType'])
            device = Device(response['id'],deviceType,response['entity'],response['IMEI'],response['SIM'],
                            response['UIN'])
            Device.devices[id] = device
        return Device.devices[id]

if __name__ == '__main__':
    deviceType = DeviceType.deviceTypeId(1)
    count = 100
    for i in range(count):
        Device.createDevice(deviceType, None, 'IMEI' + str(i), 'SIM'+str(i), 'UIN'+str(i))
                
            