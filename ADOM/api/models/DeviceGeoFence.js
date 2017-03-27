/**
* DeviceGeoFence.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  tableName:'DeviceGeoFence',
  attributes: {
    device:{
      model:'Device',
      notNull:true
    },

    geoFence:{
      model:'User',
      notNull:true
    },
    active:{
      type:'boolean',
      notNull:true
    },
    confined:{
      type:'boolean',
      notNull:true
    }
  },
  afterValidate:function(values,next){
    DeviceGeoFence.findOne({
      device:values.device,
      geoFence:values.geoFence
    }).exec(function(err,result){
      if(err) return next(err);
      if(result) return next("GeoFence is alerady associated with Device");
      next(null,result);
    });
  }
}
;

