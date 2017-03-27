import json
from utils.web import httpRequest

class Location(object):
    
    urls = {'create':'http://52.64.162.195:1338/v2/Location',
            'all':'http://52.64.162.195:1338/v2/Location',
            'findById':'http://52.64.162.195:1338/v2/Location/{0}'}
    
    locations = {}
    
    def __init__(self,identity,name,latitude,longitude):
        self.identity = identity
        self.name = name
        self.latitude = latitude
        self.longitude = longitude
    
    @classmethod
    def createLocation(cls,name,latitude,longitude):
        url = Location.urls['create']
        data = {'name':name,'latitude':latitude,'longitude':longitude}
        response = httpRequest(url, data, 'POST')
        response = json.load(response)
        location = Location(response['id'],response['name'],response['latitude'],response['longitude']) 
        return location
    
    @classmethod
    def allLocations(cls):
        url = Location.urls['all']
        response = httpRequest(url)
        response = json.load(response)
        locations = []
        for item in response:
            location = Location(item['id'],item['name'],item['latitude'],item['longitude'])
            locations.append(location) 
        return locations
        
    @classmethod
    def locationById(cls,id):
        if Location.locations.get(id) is None:
            url = Location.urls['findById'].format(id)
            response = httpRequest(url)
            response = json.load(response)
            location = Location(response['id'],response['name'],response['latitude'],response['longitude'])
            Location.locations[id] = location
        return Location.locations[id]

if __name__ == '__main__':
    locations = [{'name':'Westin','lat':17.442255,'lng':78.381495},
                 {'name':'Forum','lat':17.484416,'lng':78.389337},
                 {'name':'JNTU','lat':17.487842,'lng':78.382233},
                 {'name':'Kothaguda','lat':17.458945,'lng':78.366101},
                 {'name':'Inorbit','lat':17.434184,'lng':78.386582},
                 {'name':'DLF','lat':17.447379,'lng':78.355562},
                 {'name':'Jubilee Check Post','lat':17.426608,'lng':78.415681},
                 {'name':'Maitrivanam','lat':17.437034,'lng':78.443928},
                 {'name':'Raj Bhavan','lat':17.417347,'lng':78.460130},
                 {'name':'Prasads','lat':17.413006,'lng':78.465760}]
    for location in locations:
        Location.createLocation(location['name'], location['lat'], location['lng'])
        