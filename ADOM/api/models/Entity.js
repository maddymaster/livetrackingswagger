/**
* Entity.js
*
* @description :: Model for all the companies including Vendors and Customers.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  tableName:'Entity',

  attributes: {

    companyName:{
      type:'string',
      maxLength:200,
      notNull:true
    },

    users:{
      collection:'User',
      via:'entity'
    }
  }
};

