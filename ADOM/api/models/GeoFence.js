/**
* GeoFence.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  tableName:'GeoFence',
  attributes: {
    name:{
      type:'string',
      maxLength:50,
      notNull:true,
      unique:true
    },
    description:{
      type:'string',
      maxLength:200
    },
    points:{
      collection:'Vertex',
      via:'geoFence'
    }
  }
};

