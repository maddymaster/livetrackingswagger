/**
 * Created by Sudhir on 18/11/15.
 */
var querystring = require('querystring');
var http  = require('http');

function request(path,data,requestType){
    var postData = querystring.stringify(data);
    var options = {
        hostname: config.service.hostName,
        port: config.service.port,
        path: path,
        method: requestType,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length
        }
    };

    var req = http.request(options, function(res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
        });
        res.on('end', function() {
            console.log('No more data in response.')
        })
    });

    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });

    req.write(postData);
    req.end();
}

module.exports = request;