import json
from utils.web import httpRequest
from entities.Entity import Entity
from entities.Location import Location

class User(object):
    
    urls = {'all':'http://52.64.162.195:1338/v2/User',
            'create':'http://52.64.162.195:1338/v2/User'}
    
    def __init__(self,identity,userId,userName,name,mobileNumber,emailAddress,emergencyContactNumber,emergencyContactName,
                 emergencyContactEmail,address,location,entity):
        self.identity = identity
        self.userId = userId
        self.userName = userName
        self.name = name
        self.mobileNumber = mobileNumber
        self.emailAddress = emailAddress
        self.emergencyContactNumber = emergencyContactNumber
        self.emergencyContactName = emergencyContactName
        self.emergencyContactEmail = emergencyContactEmail
        self.address = address
        self.location = location
        self.entity = entity
        
    @classmethod
    def createUser(cls,userId,userName,password,name,mobileNumber,emailAddress,emergencyContactNumber,emergencyContactName,
                   emergencyContactEmail,address,location,entity):
        url = User.urls['create']
        data = {'userId':userId,'userName':userName,'password':password,'name':name,'mobileNumber':mobileNumber,
                'emailAddress':emailAddress,'emergencyContactNumber':emergencyContactNumber,'emergencyContactNumber':emergencyContactNumber,
                'emergencyContactName':emergencyContactName,'emergencyContactEmail':emergencyContactEmail,'address':address}
        if location:
            data['location'] = location.identity
        if entity:
            data['entity'] = entity.identity
        response = httpRequest(url, data, 'POST')
        response = json.load(response)
        user = User(response['id'],response['userId'],response['userName'],response['name'],response['mobileNumber'],
                    response['emailAddress'],response['emergencyContactNumber'],response['emergencyContactName'],response['emergencyContactEmail'],
                    response['address'],location,entity)
        return user
    
    @classmethod
    def allUsers(cls):
        url = User.urls['all']
        response = httpRequest(url)
        response = json.load(response)
        users = []
        for item in response:
            location = Location.locationById(item['location']) if item['location'] else None
            entity = Entity.entityById(item['entity']) if item['entity'] else None
            user = User(item['id'],item['userId'],item['userName'],item['name'],item['mobileNumber'],
                    item['emailAddress'],item['emergencyContactNumber'],item['emergencyContactName'],item['emergencyContactEmail'],
                    item['address'],location,entity)
            users.append(user)
        return users

if __name__ == '__main__':
    count = 120
    for i in range(count):
        User.createUser('userId'+str(i), 'userName'+str(i), 'password'+str(i), 'name'+str(i), 'mobileNumber'+str(i), 'emailAddress'+str(i), 'emergencyContactNumber'+str(i), 'emergencyContactName'+str(i), 'emergencyContactEmail'+str(i), 'address'+str(i), None, None)
        
    