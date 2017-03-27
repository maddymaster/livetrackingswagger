from utils.web import httpRequest
import json

class Entity(object):
    urls = {'all':'http://52.64.162.195:1338/v2/Entity',
            'create':'http://52.64.162.195:1338/v2/Entity',
            'findById':'http://52.64.162.195:1338/v2/Entity/{0}'}
    entities = {}
    
    def __init__(self,identity,companyName):
        self.identity = identity
        self.companyName = companyName
    
    @classmethod
    def createEntity(cls,companyName):
        url = Entity.urls['create']
        data = {'companyName':companyName}
        response = httpRequest(url, data, 'POST')
        response = json.load(response)
        entity = Entity(response['id'],response['companyName']) 
        return entity
    
    @classmethod
    def entityById(cls,id):
        if Entity.entities.get(id) is None:
            url = Entity.urls['findById'].format(id)
            response = httpRequest(url)
            response = json.load(response)
            entity = Entity(response['id'],response['companyName'])
            Entity.entities[id] = entity
        return Entity.entities[id]
    
    @classmethod
    def allEntities(cls):
        url = Entity.urls['all']
        response = httpRequest(url)
        response = json.load(response)
        entities = []
        for item in response:
            entity = Entity(item['id'],item['companyName'])
            entities.append(entity)
        return entities
    
if __name__ == '__main__':
    entities = ['ORIX','JJ','SKY CABS']
    for entity in entities:
        Entity.createEntity(entity)