/**
 * Created by Sudhir on 17/11/15.
 */
module.exports = {
    port:5051,
    service:{
        hostName:'127.0.0.1',
        port:1337,
        endPoints:{
            Alert:'/v2/Alert',
            Register:'/v2/Register',
            GPS:'/v2/GPS/device'
        }
    }
}