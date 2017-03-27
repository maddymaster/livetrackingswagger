/**
* Alert.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  tableName:'Alert',

  attributes: {
    topicName:{
      type:'string',
      maxLength:100,
      notNull:true
    },
    message:{
      type:'string',
      maxLength:200,
      notNull:true
    }
  }
};

