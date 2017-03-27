/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    allUsers:function(req,res){
        User.find().exec(function(err,results){
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
        User.findOne({id:identity}).exec(function(err,found){
            if(err){
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            }
            if(found == null){
                return res.json(404,{summary:"User does not exist."});
            }
            return res.json(200,found);
        });
    },
    create:function(req,res){
        User.create(req.params.all()).exec(function(err,created){
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
        User.findOne({id:identity}).exec(function(err,found){
            if(err){
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            }
            if(found==null){
                return res.json(404,{summary:"User does not exist."});
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
        User.findOne({id:identity}).exec(function(err,found){
            if(err){
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            }
            if(found == null){
                return res.json(404,{summary:"User does not exist."});
            }
            User.destroy({id:identity},function(err){
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
    entityByUserId:function(req,res){
        var identity = req.param('id');
        User.findOne({id:identity}).populate('entity').exec(function(err,found){
            if(err){
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            }
            if(found == null){
                return res.json(404,{summary:"User does not exist."});
            }
            return res.json(found.entity);
        });
    },
    locationByUserId:function(req,res){
        var identity = req.param('id');
        User.findOne({id:identity}).populate('location').exec(function(err,found){
            if(err){
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            }
            if(found == null){
                return res.json(404,{summary:"User does not exist."});
            }
            return res.json(found.location);
        });
    },
    rolesByUserId:function(req,res) {
        var identity = req.param('id');
        User.findOne({id: identity}).populate('roles').exec(function (err, found) {
            if (err) {
                if (err.status != null) {
                    return res.json(err.status, err);
                }
                return res.json(500, err);
            }
            if (found == null) {
                return res.json(404, {summary: "User does not exist."});
            } else {
                var roleIds = [];
                for (var i = 0; i < found.roles.length; i++) {
                    roleIds.push(found.roles[i].role);
                }
                if(roleIds.length == 0){
                    return res.json([]);
                }else{
                    Role.find({id: roleIds}).exec(function (err, results) {
                        if (err) {
                            if (err.status != null) {
                                return res.json(err.status, err);
                            }
                            return res.json(500, err);
                        }
                        return res.json(results);
                    });
                }
            }
        });
    }
};

