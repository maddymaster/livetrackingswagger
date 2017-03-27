import json
from utils.web import httpRequest
class Role(object):
    
    urls = {'create':'http://52.64.162.195:1338/v2/Role'}
    
    def __init__(self,identity,name):
        self.identity = identity
        self.name = name
    
    @classmethod
    def createRole(cls,name):
        url = Role.urls['create']
        data = {'name':name}
        response = httpRequest(url, data, 'POST')
        response = json.load(response)
        role = Role(response['id'],response['name']) 
        return role