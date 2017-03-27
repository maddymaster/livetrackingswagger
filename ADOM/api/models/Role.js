/**
* Role.js
*
* @description :: Model for different types of roles.EX:Driver,Ops,Employee
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  tableName: 'Role',

  attributes: {

    name:{
      type:'string',
      maxLength:50,
      notNull:true,
      unique:true
    },

    users:{
      collection:'UserRole',
      via:'role'
    }
  }
};

