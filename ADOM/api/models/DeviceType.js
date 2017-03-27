/**
* DeviceType.js
*
* @description :: Model for Device types in the system.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  tableName:'DeviceType',

  attributes: {

    make:{
      type:'string',
      maxLength:50,
      notNull:true
    },

    model:{
      type:'string',
      maxLength:200,
      notNull:true
    },

    type:{
      type:'string',
      maxLength:50,
      notNull:true
    },
    devices:{
      collection:'Device',
      via:'deviceType'
    }
  }
};

