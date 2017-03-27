/**
* Location.js
*
* @description :: Model for location.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  tableName:'Location',

  attributes: {

    latitude:{
      type:'float',
      notNull:true
    },

    longitude:{
      type:'float',
      notNull:true
    },

    name:{
      type:'string',
      maxLength:200
    },
    users:{
      collection: 'User',
      via:'location'
    }
  }
};

