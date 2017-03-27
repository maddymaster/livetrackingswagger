/**
 * DeviceController
 *
 * @description :: Server-side logic for managing Devices
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    allDevices:function(req,res){
        var data = req.params.all()
        Device.find(data).exec(function(err,results){
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
        Device.findOne({id:identity}).exec(function(err,found){
            if(err){
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            }
            if(found == null){
                return res.json(404,{summary:"Device does not exist."});
            }
            return res.json(200,found);
        });
    },
    create:function(req,res){
        Device.create(req.params.all()).exec(function(err,created){
            if(err){
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            }
            return res.json(created);
        });
    },
    updateById:function(req,res){
        var identity = req.param('id');
        var data = req.params.all();
        Device.findOne({id:identity}).exec(function(err,found){
            if(err){
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            }
            if(found==null){
                return res.json(404,{summary:"Device does not exist."});
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
        Device.findOne({id:identity}).exec(function(err,found){
            if(err){
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            }
            if(found == null){
                return res.json(404,{summary:"Device does not exist."});
            }
            Device.destroy({id:identity},function(err){
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
    deviceTypeByDevice:function(req,res){
        var identity = req.param('id');
        Device.findOne({id:identity}).populate('deviceType').exec(function(err,found){
            if(err){
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            }
            if(found == null){
                return res.json(404,{summary:"Device does not exist."});
            }
            return res.json(found.deviceType);
        });
    },
    deleteGPSDataById:function(req,res){
        var identity = req.param('id');
        Device.findOne({id:identity}).exec(function(err,found){
            if(err){
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            }
            if(found == null){
                return res.json(404,{summary:"Device does not exist."});
            }
            GPSData.destroy({device:identity},function(err,deleted){
                if(err){
                    if(err.status != null){
                        return res.json(err.status,err);
                    }
                    return res.json(500,err);
                }
                return res.json(deleted);
            });
        });
    },
    deviceByParams:function(req,res){
        console.log(req.params.all());
        return res.json({});
    },
    gpsDataByDeviceId:function(req,res){
        var identity = req.param('id');
        var data = req.params.all();
        var start = new Date(data.startTime);
        if(isNaN(start)){
            return res.json(400,{error:"startTime is not in date format."});
        }
        var end = new Date(data.endTime);
        if(isNaN(end)){
            return res.json(400,{error:"endTime is not in date format."});
        }
        if(+start >= +end){
            return res.json(400,{error:"startTime is after endTime."});
        }
        if(data.startRange == null){
            data.startRange = 0;
        }
        if(data.count == null){
            data.count = 20;
        }
        Device.findOne({id:identity}).exec(function(err,found){
            if(err){
                console.error(err)
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            }
            if(found == null){
                return res.json(404,{summary:"Device does not exist."});
            }
            GPSData.find({where:{device:identity,
                GPSDateTime:{'>=':new Date(data.startTime),'<=':new Date(data.endTime)}},
                skip:data.startRange,
                limit:data.count,
                sort:'GPSDateTime'}).exec(function(err,results){
                if(err){
                    console.error(err)
                    if(err.status != null){
                        return res.json(err.status,err);
                    }
                    return res.json(500,err);
                }
                return res.json(results);
            })
        })
    },
    geoFencesByDeviceId:function(req,res){
        var identity = req.param('id');
        Device.findOne({id:identity}).populate('geoFences').exec(function(err,found){
            if(err){
                console.error(err);
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            }
            if(found == null){
                return res.json(404,{summary:"Device does not exist."});
            }else{
                var geoFenceIds = []
                for(var i=0; i<found.geoFences.length;i++){
                    geoFenceIds.push(found.geoFences[i].geoFence);
                }
                if(geoFenceIds.length == 0){
                    return res.json([]);
                }else{
                    DeviceGeoFence.find({goeFence:geoFenceIds}).exec(function(err,results){
                        if(err){
                            console.error(err);
                            if(err.status != null){
                                return res.json(err.status,err);
                            }
                            return res.json(500,err);
                        }
                        return res.json(results)
                    });
                }
            }
        });
    }

};

