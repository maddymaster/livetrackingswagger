/**
* User.js
*
* @description :: Model for User information which holds personal information of user.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  tableName: 'User',

  attributes: {

    address:{
      type:'string',
      maxLength:200
    },

    emailAddress:{
      type:'string',
      maxLength:50,
      notNull: true
    },

    emergencyContactEmail:{
      type:'string',
      maxLength: 50
    },

    emergencyContactName:{
      type:'string',
      maxLength:50
    },

    emergencyContactNumber:{
      type:'string',
      maxLength:50,
      notNull:true
    },

    entity:{
      model:'Entity',
      notNull:true
    },

    location:{
      model:'Location'
    },

    mobileNumber:{
      type:'string',
      maxLength:50,
      notNull:true
    },

    name:{
      type:'string',
      maxLength:50
    },

    password:{
      type:'string',
      maxLength:50,
      notNull:true
    },

    trips:{
      collection:'TripDetails',
      via:'user'
    },

    roles:{
      collection:'UserRole',
      via:'role'
    },

    userId:{
      type:'string',
      maxLength:50
    },

    userName:{
      type:'string',
      maxLength:50,
      notNull:true,
      unique: true
    },
    toJSON:function(){
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  }
};

