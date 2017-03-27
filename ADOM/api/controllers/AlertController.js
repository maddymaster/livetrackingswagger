/**
 * AlertController
 *
 * @description :: Server-side logic for managing Alerts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    allAlerts:function(req,res){
        var data = req.params.all()
        Alert.find(data).exec(function(err,results){
            if(err){
                console.error("Error while fetching all alerts. ");
                console.error(err);
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
        Alert.findOne({id:identity}).exec(function(err,found){
            if(err){
                console.error("Error while fetching alert:" + id.toString);
                console.error(err);
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            }
            if(found == null){
                return res.json(404,{summary:"Alert does not exist."});
            }
            return res.json(200,found);
        });
    },
    create:function(req,res){
        Alert.create(req.params.all()).exec(function(err,created){
            if(err){
                console.error("Error while creating an alert.");
                console.error(err);
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
        Alert.findOne({id:identity}).exec(function(err,found){
            if(err){
                console.error("Error while updating the alert:" + identity.toString());
                console.error(err);
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            }
            if(found==null){
                return res.json(404,{summary:"Alert does not exist."});
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
        Alert.findOne({id:identity}).exec(function(err,found){
            if(err){
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            }
            if(found == null){
                return res.json(404,{summary:"Alert does not exist."});
            }
            Alert.destroy({id:identity},function(err){
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

