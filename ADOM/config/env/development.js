/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  port: 1338,

  models:{
    migrate: 'safe'
  },

  connections:{
    adomDatabase:{
      adapter:'sails-postgresql',
      host:'52.64.58.105',
      port:5432,
      user:'adom',
      password:'drowssap',
      database:'adomrestdb'
    }
  },

  kafka:{
    zookeeper:{
      host:'52.64.202.166',
      port:2181
    }
  }

};
