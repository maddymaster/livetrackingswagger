/**
 * Created by Sudhir on 18/11/15.
 */
var DataProcessor = require('./DataProcessor');
var httpRequest = require('../Utils/Web');
function trackMateDataProcessor(data) {
    DataProcessor.call(this, data);
}

trackMateDataProcessor.prototype.processStartPacket = function(){
    console.log(this.data);
}

trackMateDataProcessor.prototype.processPeriodicPacket = function(){
    var msg = {};
    var date = this.data.Date;
    var time = this.data.Time;
    msg.latitude = this.data.Latitude;
    msg.longitude = this.data.Longitude;
    msg.speed = this.data.Speed;
    msg.Direction = this.data.Heading;
    msg.Odometer = this.data.GPSOdometerReading;
    msg.GPSDateTime = new Date('20'+date.slice(4,6) +'-'+date.slice(2,4)+'-'+date.slice(0,2)+'T'+time.slice(0,2)+':'+time.slice(2,4)+':'+time.slice(4,6)).toISOString();
    console.log(msg);
    var path = config.service.endPoints.GPS.replace('device',this.data.DeviceID);
    httpRequest(path,msg,'POST');
}

trackMateDataProcessor.prototype.processAlertPacket = function(){
    console.log(this.data);
}

module.exports = trackMateDataProcessor;