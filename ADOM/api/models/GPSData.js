/**
* GPSData.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  tableName: "GPSData",
  attributes: {
    device:{
      model:'Device'
    },

    latitude:{
      type: 'float'
    },

    longitude:{
      type: 'float'
    },

    speed:{
      type: 'integer'
    },

    GPSDateTime:{
      type:'datetime',
      notNull: true
    },

    Direction:{
      type: 'string',
      maxLength: 10
    },

    'Odometer':{
      type: 'float'
    }
  },
  afterCreate:function(value,next){
      var sockets = sails.sockets.subscribers('Device#'+ value.device);
      if(sockets.length != 0){
        sails.sockets.emit(sockets,'Device#'+ value.device,value);
      }
      next();
  }
};

