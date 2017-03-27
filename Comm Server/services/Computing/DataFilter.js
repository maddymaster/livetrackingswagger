/**
 * Created by Sudhir on 18/11/15.
 */
var protocols = require('../../config/message/protocol');
var prototypes = require('prototypes');
function processMessage(protocol,data){
    var packetTypes = protocol.packetTypes;
    var dataProcessor = require('../Data/'+ protocol.dataProcessor);
    if(data[0] == protocol.starts && data[data.length-1] == protocol.ends){
        trimmed_data = data.slice(0,data.length-2);
        for(packetType in packetTypes){
            if(packetTypes[packetType].method == 'startsWith' && trimmed_data.startsWith(packetTypes[packetType].value)){
                var values = trimmed_data.split(protocol.delimiter);
                var columns = packetTypes[packetType].columns;
                if(values.length == columns.length){
                    var dataAsObject = {}
                    for(i=0;i<columns.length;i++){
                        dataAsObject[columns[i]] = values[i]
                    }
                    var dataProcessorObject = new dataProcessor(dataAsObject)
                    if(packetType == 'StartPacket'){
                        dataProcessorObject.processStartPacket();
                    }else if(packetType == 'PeriodicPacket'){
                        dataProcessorObject.processPeriodicPacket();
                    }else if(packetType == 'AlertPacket'){
                        dataProcessorObject.processAlertPacket();
                    }
                }else{
                    console.log("Insufficient values sent in the message.")
                }
            }
        }
    }else{
        console.log("Insufficient Message:" + data);
    }
}

function process(data){
    var flag = false;
    for (protocol in protocols){
        var criteria = protocols[protocol].criteria;
        if(criteria.method == 'startsWith'){
            for(i=0;i<criteria.values.length;i++){
                if(data.startsWith(criteria.values[i])){
                    flag = true;
                    processMessage(protocols[protocol],data);
                }
            }
        }
    }
    if(!flag){
        console.log("Invalid Data:" + data);
    }
}

module.exports = process;