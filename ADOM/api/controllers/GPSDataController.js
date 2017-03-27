/**
 * GPSDataController
 *
 * @description :: Server-side logic for managing Gpsdatas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var kafka = require('../services/kafka')

module.exports = {
    completeGPSData:function(req,res){
        GPSData.find().exec(function(err,results){
            if(err){
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            }
            return res.json(results);
        });
    },

    findById:function(req,res){
        var identity = req.param('id');
        GPSData.findOne({id:identity}).exec(function(err,found){
            if(err){
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            }
            if(found == null){
                return res.json(404,{summary:"GPS Data does not exist."});
            }
            return res.json(200,found);
        });
    },
    createByDevice:function(req,res){
        var data = req.params.all()
        Device.findOne({UIN:data.device}).exec(function(err,found){
            if(err){
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            }
            if(found == null){
                return res.json(404,{summary:"Device does not exist."});
            }else{
                data.device = found.id;
                GPSData.create(data).exec(function(err,created){
                    if(err){
                        if(err.status != null){
                            return res.json(err.status,err);
                        }
                        return res.json(500,err);
                    }
                    res.json(created);
                    Device.findOne({id:created.device}).populate('geoFences').exec(function(err,found){
                            if(err){
                                console.error(err);
                            }
                            if(found != null){
                                var geoFenceIds = []
                                for(var i=0; i<found.geoFences.length;i++){
                                    geoFenceIds.push(found.geoFences[i].geoFence);
                                }
                                if(geoFenceIds.length != 0){
                                    GeoFence.find({id:geoFenceIds}).populate('points').exec(function(err,results){
                                        if(err){
                                            console.error(err);
                                        }
                                        var message = {}
                                        message.gpsData = created;
                                        message.geoFences = results;
                                        message.topicName = 'GeoFence'
                                        kafka.publishTopic('geofence',0,JSON.stringify(message),function(err,result){
                                            if(err){
                                                console.log(err);
                                            }
                                            console.log(result);
                                        });
                                    });
                                }
                            }
                        }
                    );
                });
            }
        });
    },
    create:function(req,res){
        GPSData.create(req.params.all()).exec(function(err,created){
            if(err){
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            }
            res.json(created);
            Device.findOne({id:created.device}).populate('geoFences').exec(function(err,found){
                    if(err){
                        console.error(err);
                    }
                    if(found != null){
                        var geoFenceIds = []
                        for(var i=0; i<found.geoFences.length;i++){
                            geoFenceIds.push(found.geoFences[i].geoFence);
                        }
                        if(geoFenceIds.length != 0){
                            GeoFence.find({id:geoFenceIds}).populate('points').exec(function(err,results){
                                if(err){
                                    console.error(err);
                                }
                                var message = {}
                                message.gpsData = created;
                                message.geoFences = results;
                                message.topicName = 'GeoFence'
                                kafka.publishTopic('geofence',0,JSON.stringify(message),function(err,result){
                                    if(err){
                                        console.log(err);
                                    }
                                    console.log(result);
                                });
                            });
                        }
                    }
                }
            );
        });
    },
    updateById:function(req,res){
        var identity = req.param('id');
        var data = req.params.all();
        GPSData.findOne({id:identity}).exec(function(err,found){
            if(err){
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            }
            if(found==null){
                return res.json(404,{summary:"GPS Data does not exist."});
            }
            for(var key in data){
                if(found.hasOwnProperty(key)){
                    found[key] = data[key];
                }
            }
            found.save(function(err){
                if(err){
                    if(err.status != null){
                        return res.json(err.status,err);
                    }
                    return res.json(500,err);
                }
                return res.json(found);
            });
        });
    },
    deleteById:function(req,res){
        var identity = req.param('id');
        GPSData.findOne({id:identity}).exec(function(err,found){
            if(err){
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            }
            if(found == null){
                return res.json(404,{summary:"GPS Data does not exist."});
            }
            Trip.destroy({id:identity},function(err){
                if(err){
                    if(err.status != null){
                        return res.json(err.status,err);
                    }
                    return res.json(500,err);
                }
                return res.json(found);
            });
        });
    },
    eventsOfDevices:function(req,res){
        var deviceIds = req.param('devices');
        var eventIds = []
        Device.find({id:deviceIds}).exec(function(err,results){
            if(err){
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            }
            var eventIds = []
            for(var i=0;i<results.length;i++){
                eventIds.push('Device#' + results[i].id);
            }
            return res.json(eventIds);
        });
    }
};

