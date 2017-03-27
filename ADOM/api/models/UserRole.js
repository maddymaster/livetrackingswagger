/**
* UserRole.js
*
* @description :: Relation between User and Role
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  tableName:'UserRole',

  attributes: {

    role:{
      model:'Role',
      notNull:true
    },

    user:{
      model:'User',
      notNull:true
    }
  }
};

