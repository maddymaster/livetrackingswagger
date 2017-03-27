/**
* Vehicle.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  tableName:'Vehicle',

  attributes: {

    capacity:{
      type:'integer',
      notNull:true
    },

    device:{
      model:'Device',
      unique:true
    },

    entity:{
      model:'Entity',
      notNull:true
    },

    make:{
      type:'string',
      maxLength:50,
      notNull:true
    },

    model:{
      type:'string',
      maxLength:50,
      notNull:true
    },

    registrationNumber:{
      type:'string',
      maxLength:50,
      notNull:true,
      unique:true
    }
  }
};

