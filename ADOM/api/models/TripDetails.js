/**
* TripDetails.js
*
* @description :: Relation between Trip, Passenger and Locations
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  tableName:'TripDetails',

  attributes: {

    endLocation:{
      model:'Location',
      notNull:true
    },

    startLocation:{
      model:'Location',
      notNull:true
    },

    trip:{
      model:'Trip',
      notNull:true
    },

    user:{
      model:'User',
      notNull:true
    }
  }
};

