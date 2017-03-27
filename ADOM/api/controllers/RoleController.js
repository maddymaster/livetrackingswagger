/**
 * RoleController
 *
 * @description :: Server-side logic for managing Roles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    allRoles:function(req,res){
        Role.find().exec(function(err,results){
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
        Role.findOne({id:identity}).exec(function(err,found){
            if(err){
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            }
            if(found == null){
                return res.json(404,{summary:"Role does not exist."});
            }
            return res.json(200,found);
        });
    },

    create:function(req,res){
        Role.create(req.params.all()).exec(function(err,created){
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
        Role.findOne({id:identity}).exec(function(err,found){
            if(err){
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            }
            if(found==null){
                return res.json(404,{summary:"Role does not exist."});
            }
            for(var key in data){
                if(found.hasOwnProperty(key)){
                    found[key] = data[key];
                }
            }
            role.save(function(err){
                if(err){
                    if(err.status != null){
                        return res.json(err.status,err);
                    }
                    return res.json(500,err);
                }
                return res.json(role);
            });
        });
    },
    deleteById:function(req,res){
        var identity = req.param('id');
        Role.findOne({id:identity}).exec(function(err,role){
            if(err){
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            }
            if(role==null){
                return res.json(404,{summary:"Role does not exist."});
            }
            Role.destroy({id:identity},function(err){
                if(err){
                    if(err.status != null){
                        return res.json(err.status,err);
                    }
                    return res.json(500,err);
                }
                return res.json(role);
            });
        });
    },
    usersByRoleId:function(req,res){
        var identity = req.param('id');
        Role.findOne({id:identity}).populate('users').exec(function(err,found) {
            if(err){
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            }
            if(found == null){
                return res.json(404,{summary:"Role does not exist."});
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

