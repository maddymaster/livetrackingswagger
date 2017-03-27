/**
* Device.js
*
* @description :: Model for Device information.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  tableName:'Device',

  attributes: {

    deviceType:{
      model:'DeviceType',
      notNull:true
    },

    entity:{
      model:'Entity',
      notNull:true
    },

    IMEI:{
      type:'string',
      maxLength:50,
      notNull:true,
      unique:true
    },

    SIM:{
      type:'string',
      maxLength:50,
      notNull:true,
      unique:true
    },

    UIN:{
      type:'string',
      maxLength:100,
      notNull:true,
      unique:true
    },
    geoFences:{
      collection:'DeviceGeoFence',
      via:'geoFence'
    }
  }
};

