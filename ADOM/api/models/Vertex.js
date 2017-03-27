/**
* Vertex.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  tableName:'Vertex',
  attributes: {
    geoFence:{
      model:'GeoFence',
      notNull:true
    },
    seq:{
      type:'integer',
      notNull:true
    },
    latitude:{
      type:'float',
      notNull:true
    },
    longitude:{
      type:'float',
      notNull:true
    }
  },
  afterValidate:function(values,next){
    Vertex.findOne({
      geoFence:values.geoFence,
      seq:values.seq
    }).exec(function(err,result){
      if(err) return next(err);
      if(result) return next("Vertex with this seq for GeoFence is already in system.");
      next(null,values);
    });
  }
};

