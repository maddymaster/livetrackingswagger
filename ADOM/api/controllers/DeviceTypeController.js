/**
 * DeviceTypeController
 *
 * @description :: Server-side logic for managing Devicetypes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    allDeviceTypes:function(req,res){
        DeviceType.find().exec(function(err,results){
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
        DeviceType.findOne({id:identity}).exec(function(err,found){
            if(err){
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            }
            if(found == null){
                return res.json(404,{summary:"Device Type does not exist."});
            }
            return res.json(200,found);
        });
    },
    devicesByDeviceType:function(req,res){
        var identity = req.param('id');
        DeviceType.findOne({id:identity}).populate('devices').exec(function(err,found) {
            if(err){
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            }
            if(found == null){
                return res.json(404,{summary:"Device Type does not exist."});
            }else{
                var deviceIds = [];
                for(var i=0; i<found.devices.length;i++){
                    deviceIds.push(found.devices[i].id);
                }
                Device.find({id:deviceIds}).exec(function(err,results){
                    if(err){
                        if(err.status != null){
                            return res.json(err.status,err);
                        }
                        return res.json(500,err);
                    }
                    return res.json(results);
                });
            }
        });
    },
    create:function(req,res){
        DeviceType.create(req.params.all()).exec(function(err,created){
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
        DeviceType.findOne({id:identity}).exec(function(err,found){
            if(err){
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            }
            if(found==null){
                return res.json(404,{summary:"Device Type does not exist."});
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
        DeviceType.findOne({id:identity}).exec(function(err,found){
            if(err){
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            }
            if(found == null){
                return res.json(404,{summary:"Device Type does not exist."});
            }
            DeviceType.destroy({id:identity},function(err){
                if(err){
                    if(err.status != null){
                        return res.json(err.status,err);
                    }
                    return res.json(500,err);
                }
                return res.json(found);
            });
        });
    }
};

