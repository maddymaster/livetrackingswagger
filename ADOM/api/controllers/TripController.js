/**
 * TripController
 *
 * @description :: Server-side logic for managing Trips
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    allTrips:function(req,res){
        Trip.find().exec(function(err,results){
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
        Trip.findOne({id:identity}).exec(function(err,found){
            if(err){
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            }
            if(found == null){
                return res.json(404,{summary:"Trip does not exist."});
            }
            return res.json(200,found);
        });
    },
    create:function(req,res){
        Trip.create(req.params.all()).exec(function(err,created){
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
        Trip.findOne({id:identity}).exec(function(err,found){
            if(err){
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            }
            if(found==null){
                return res.json(404,{summary:"Trip does not exist."});
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
        Trip.findOne({id:identity}).exec(function(err,found){
            if(err){
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            }
            if(found == null){
                return res.json(404,{summary:"Trip does not exist."});
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
    entityByTripId:function(req,res){
        var identity = req.param('id');
        Trip.findOne({id:identity}).populate('entity').exec(function(err,found){
            if(err){
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            }
            if(found == null){
                return res.json(404,{summary:"Trip does not exist."});
            }
            return res.json(found.entity);
        });
    },
    driverByTripId:function(req,res){
        var identity = req.param('id');
        Trip.findOne({id:identity}).populate('driver').exec(function(err,found){
            if(err){
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            }
            if(found == null){
                return res.json(404,{summary:"Trip does not exist."});
            }
            return res.json(found.driver);
        });
    },
    usersByTripId:function(req,res){
        var identity = req.param('id');
        Trip.findOne({id:identity}).populate('users').exec(function(err,found) {
            if(err){
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            }
            if(found == null){
                return res.json(404,{summary:"Trip does not exist."});
            }else{
                var userIds = [];
                for(var i=0; i<found.users.length;i++){
                    userIds.push(found.users[i].user);
                }
                if(userIds.length == 0){
                    return res.json([]);
                }else{
                    User.find({id:userIds}).exec(function(err,results){
                        if(err){
                            if(err.status != null){
                                return res.json(err.status,err);
                            }
                            return res.json(500,err);
                        }
                        return res.json(results);
                    });
                }
            }
        });
    }
};

