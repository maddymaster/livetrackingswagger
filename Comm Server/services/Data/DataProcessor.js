/**
 * Created by Sudhir on 17/11/15.
 */
function dataProcessor(data){
    this.data = data;
}

dataProcessor.prototype.processStartPacket = function(){
    console.error("processStartPacket is not implemented.");
}

dataProcessor.prototype.processPeriodicPacket = function(){
    console.error("processPeriodicPacket is not implemented.");
}

dataProcessor.prototype.processAlertPacket = function(){
    console.error("processAlertPacket is not implemented.");
}

module.exports = dataProcessor;