/**
* Trip.js
*
* @description :: Model for Trip information
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  tableName:'Trip',

  attributes: {

    assignedTime:{
      type:'datetime',
      notNull:true
    },

    device:{
      model:'Device',
      notNull:true
    },

    driver:{
      model:'User',
      notNull:true
    },

    endLocation:{
      model:'Location',
      notNull:true
    },

    endTime:{
      type:'datetime'
    },

    entity:{
      model:'Entity',
      notNull: true
    },

    startTime:{
      type:'datetime'
    },

    startLocation:{
      model:'Location',
      notNull:true
    },

    status:{
      type:'string',
      maxLength:50,
      notNull:true
    },

    users:{
      collection:'TripDetails',
      via:'trip'
    }
  }
};

