var commandLineArgs = require('command-line-args');
var net = require('net');
var processData = require('./services/Computing/DataFilter');
var cli = commandLineArgs([
    { name: 'environment', alias: 'e', type: String, defaultOption: true },
    { name: 'port', alias: 'p', type: Number}
])

var options = cli.parse();

if (options.environment == null){
    console.log(cli.getUsage());
    process.exit(1);
}
global.config = require('./config/env/' + options.environment);

var port = options.port || global.config.port;

var server = net.createServer(function(sock){
    console.log('Connected to ' + sock.remoteAddress + ':' + sock.remotePort);
    sock.on('data',function(data){
        var dataAsString = data.toString();
        console.log("Data recieved:" + dataAsString);
        processData(dataAsString);
    });
    sock.on('close',function(data){
        console.log('Closed ' + sock.remoteAddress + ':' + sock.remotePort);
    });
});

server.listen(port,function(){
    console.log("Server Started and listening on port:" + port);
});