var kafka = require('kafka-node');
var Producer = kafka.Producer;
var Client = kafka.Client;

module.exports = {
    publishTopic:function(topicName,partition,message,callback){
        var host = sails.config.kafka.zookeeper.host;
        var port = sails.config.kafka.zookeeper.port;
        var client = new Client(host+':'+port);
        var producer = new Producer(client, { requireAcks: 1 });
        producer.on('ready', function () {
            producer.send([
                { topic: topicName, partition: partition, messages:message, attributes: 0 }
            ], function (err, result) {
                if(err){
                    return callback(err,null);
                }
                return callback(null,result);
            });
        });
        producer.on('error', function (err) {
            return callback(err,null);
        });
    }
}