import sys
import json
import logging
from pyspark import SparkContext
from pyspark.streaming import StreamingContext
from pyspark.streaming.kafka import KafkaUtils

if __name__ == "__main__":
        if len(sys.argv) !=3:
                print("Usage: Wrong")
                exit(-1)

brokers = sys.argv[1]
service = sys.argv[2]

sc = SparkContext(appName = "GeoFence", pyFiles = ['/Users/Sudhir/Projects/Python/lib/gis.zip'])
ssc = StreamingContext(sc, 10)
kvs = KafkaUtils.createDirectStream(ssc, ['geofence'], {"metadata.broker.list":brokers})

def kafkaToJson(object):
        data = json.loads(object)
        return data

def process(data):
        from gis.geofence import processGPSData
        processGPSData(data,service)
	gpsInfo = data['gpsData']
	return {'Device':gpsInfo['device'],'Time':gpsInfo['GPSDateTime']}

stream = kvs.map(lambda x:x[1])

messages = stream.map(kafkaToJson)

processed_gps_data = messages.map(process)

def log(data):
	device = data['Device']
	time = data['Time']
	print 'Processed GPS data of Deivce:' + str(device) +' recieved at:' + str(time)

def processRDD(rdd):
        rdd.foreach(log)

processed_gps_data.foreachRDD(processRDD)

ssc.start()
ssc.awaitTermination()
