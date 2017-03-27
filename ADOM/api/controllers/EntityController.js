/**
 * EntityController
 *
 * @description :: Server-side logic for managing Entities
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    allEntities:function(req,res){
        Entity.find().exec(function(err,results){
            if(err){
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            }
            return res.json(results);
        });
    },
    findById: function(req,res) {
        var identity = req.param('id');
        Entity.findOne({id:identity}).exec(function(err,found){
            if(err){
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            }
            if(found == null){
                return res.json(404,{summary:"Entity does not exist."});
            }
            return res.json(found);
        });
    },
    usersByEntity:function(req,res){
        var identity = req.param('id');
        Entity.findOne({id:identity}).populate('users').exec(function(err,found) {
            if(err){
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            }
            if(found == null){
                return res.json(404,{summary:"Entity does not exist."});
            }else{
                var userIds = [];
                for(var i=0; i<found.users.length;i++){
                    userIds.push(found.users[i].id);
                }
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
        });
    },
    create:function(req,res){
        Entity.create(req.params.all()).exec(function(err,created){
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
        Entity.findOne({id:identity}).exec(function(err,found){
            if(err){
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            }
            if(found==null){
                return res.json(404,{summary:"Entity does not exist."});
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
        Entity.findOne({id:identity}).exec(function(err,role){
            if(err){
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            }
            if(role==null){
                return res.json(404,{summary:"Entity does not exist."});
            }
            Entity.destroy({id:identity},function(err){
                if(err){
                    if(err.status != null){
                        return res.json(err.status,err);
                    }
                    return res.json(500,err);
                }
                return res.json(role);
            });
        });
    }
};

