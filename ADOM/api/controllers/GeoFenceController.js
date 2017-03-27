/**
 * GeoFenceController
 *
 * @description :: Server-side logic for managing Geofences
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    allGeoFences:function(req,res){
        GeoFence.find().exec(function(err,results){
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
        GeoFence.findOne({id:identity}).exec(function(err,found){
            if(err){
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            }
            if(found == null){
                return res.json(404,{summary:"GeoFence does not exist."});
            }
            return res.json(200,found);
        });
    },
    create:function(req,res){
        GeoFence.create(req.params.all()).exec(function(err,created){
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
        GeoFence.findOne({id:identity}).exec(function(err,found){
            if(err){
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            }
            if(found==null){
                return res.json(404,{summary:"GeoFence does not exist."});
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
        GeoFence.findOne({id:identity}).exec(function(err,found){
            if(err){
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            }
            if(found == null){
                return res.json(404,{summary:"GeoFence does not exist."});
            }
            GeoFence.destroy({id:identity},function(err){
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
    vertexesOfGeoFence:function(req,res){
        var identity = req.param('id');
        GeoFence.findOne({id:identity}).populate('points').exec(function(err,found) {
            if(err){
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            }
            if(found == null){
                return res.json(404,{summary:"GeoFence does not exist."});
            }else{
                var points = [];
                for(var i=0; i<found.points.length;i++){
                    points.push(found.points[i].id);
                }
                Vertex.find({id:points}).exec(function(err,results){
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
    }

};

