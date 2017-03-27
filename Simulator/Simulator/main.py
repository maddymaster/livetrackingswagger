import random
from datetime import datetime
from entities.Device import Device
from entities.Location import Location
from entities.User import User 
from entities.Vehicle import Vehicle
from entities.Trip import Trip
from entities.Entity import Entity

class Simulator(object):
    def __init__(self):
        self.devices = Device.allDevices()
        self.locations = Location.allLocations()
        self.users = User.allUsers()
        self.vehicles = Vehicle.allVehicles()
        self.entities = Entity.allEntities()
    
    def run(self):
        trips = []
        for i in range(min([len(self.devices),len(self.users),len(self.vehicles)])):
            device = self.devices[random.randint(0,len(self.devices)-1)]
            user = self.users[random.randint(0,len(self.users)-1)]
            entity = self.entities[random.randint(0,len(self.entities)-1)]
            vehicle = self.vehicles[random.randint(0,len(self.vehicles)-1)]
            start_end = random.sample(range(len(self.locations)),2)
            trip = Trip.createTrip(datetime.now(), device, user, self.locations[start_end[0]], None, entity, None, self.locations[start_end[1]], 'Assigned', vehicle)
            trips.append(trip)
            self.devices.remove(device)
            self.users.remove(user)
            self.vehicles.remove(vehicle)
        for trip in trips:
            trip.start()
            
if __name__=='__main__':
    simulator = Simulator()
    simulator.run()
    
    
    