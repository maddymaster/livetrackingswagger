/**
* DeviceLatestState.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  tableName:'DeviceLatestState',
  attributes: {
    device:{
      model:'Device',
      notNull:true,
      unique:true
    },
    GPS:{
      model:'GPSData',
      notNull:true
    },
    geoFenceBreach:{
      type:'boolean',
      notNull:true
    }
  }
};

