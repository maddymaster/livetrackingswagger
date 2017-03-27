/**
 * DeviceLatestStateController
 *
 * @description :: Server-side logic for managing Devicelateststates
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	createOrUpdate:function(req,res){
        var data = req.params.all();
        data.device = data.id;
        delete data.id;
        DeviceLatestState.findOne({device:data.device}).exec(function(err,found){
            if(err){
                console.error("Error while setting latest state for device.");
                console.error(err);
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            } else if(found){
                DeviceLatestState.update({device:data.device},data).exec(function(err,results){
                    if(err){
                        console.error("Error while setting latest state for device.");
                        console.error(err);
                        if(err.status != null){
                            return res.json(err.status,err);
                        }
                        return res.json(500,err);
                    }
                    return res.json(200,results[0]);
                })
            }else{
              DeviceLatestState.create(data).exec(function(err,created){
                  if(err){
                      console.error("Error while setting latest state for device.");
                      console.error(err);
                      if(err.status != null){
                          return res.json(err.status,err);
                      }
                      return res.json(500,err);
                  }
                  return res.json(201,created);
              })
            }
        })
    },
    findByDeviceId:function(req,res){
        var identity = req.param('id');
        DeviceLatestState.findOne({device:identity}).exec(function(err,found){
            if(err){
                console.error("Error while fetching latest state for device.");
                console.error(err);
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            }
            return res.json(found);
        })
    },
    allDeviceLatestStates:function(req,res){
        DeviceLatestState.find().exec(function(err,results){
            if(err){
                console.error("Error while fetching latest state for device.");
                console.error(err);
                if(err.status != null){
                    return res.json(err.status,err);
                }
                return res.json(500,err);
            }
            return res.json(results);
        })
    }
};

