from datetime import datetime
import googlemaps

def getDirections(start,end):
    gmaps = googlemaps.Client(key='AIzaSyD_fLLOZ37yzFawUE4_G-iCr4P4eMYHlO0')
    now = datetime.now()
    directions_result = gmaps.directions(start,end,departure_time=now)
    if len(directions_result) <> 0:
        return directions_result[0]
    return None

def getSnap(path,interpolate=True):
    gmaps = googlemaps.Client(key='AIzaSyD_fLLOZ37yzFawUE4_G-iCr4P4eMYHlO0')
    result = gmaps.snap_to_roads(path,interpolate=interpolate)
    return result

def decode(point_str):
    '''Decodes a polyline that has been encoded using Google's algorithm
    http://code.google.com/apis/maps/documentation/polylinealgorithm.html
    
    This is a generic method that returns a list of (latitude, longitude) 
    tuples.
    
    :param point_str: Encoded polyline string.
    :type point_str: string
    :returns: List of 2-tuples where each tuple is (latitude, longitude)
    :rtype: list
    
    '''
            
    # sone coordinate offset is represented by 4 to 5 binary chunks
    coord_chunks = [[]]
    for char in point_str:
        
        # convert each character to decimal from ascii
        value = ord(char) - 63
        
        # values that have a chunk following have an extra 1 on the left
        split_after = not (value & 0x20)         
        value &= 0x1F
        
        coord_chunks[-1].append(value)
        
        if split_after:
                coord_chunks.append([])
        
    del coord_chunks[-1]
    
    coords = []
    
    for coord_chunk in coord_chunks:
        coord = 0
        
        for i, chunk in enumerate(coord_chunk):                    
            coord |= chunk << (i * 5) 
        
        #there is a 1 on the right if the coord is negative
        if coord & 0x1:
            coord = ~coord #invert
        coord >>= 1
        coord /= 100000.0
                    
        coords.append(coord)
    
    # convert the 1 dimensional list to a 2 dimensional list and offsets to 
    # actual values
    points = []
    prev_x = 0
    prev_y = 0
    for i in xrange(0, len(coords) - 1, 2):
        if coords[i] == 0 and coords[i + 1] == 0:
            continue
        
        prev_x += coords[i + 1]
        prev_y += coords[i]
        # a round to 6 digits ensures that the floats are the same as when 
        # they were encoded
        points.append((round(prev_x, 6), round(prev_y, 6)))
    
    return points 

if __name__ == '__main__':
    path = [(17.484263, 78.388930),(17.399830, 78.414721)]
    directions = getDirections(path[0],path[1])
    points = []
    if directions and directions['legs']:
        steps = directions['legs'][0]['steps']
        for step in steps:
            print decode(step['polyline']['points'])
