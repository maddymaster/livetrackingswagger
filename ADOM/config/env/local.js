/**
 * Created by sudhir on 08/10/15.
 */
module.exports = {
    port: 1337,

    models:{
        migrate: 'safe'
    },

    connections:{
        adomDatabase:{
            adapter:'sails-postgresql',
            host:'127.0.0.1',
            port:5432,
            user:'postgres',
            password:'postgres',
            database:'postgres'
        }
    },
    kafka:{
        zookeeper:{
            host:'localhost',
            port:2181
        }
    }

};