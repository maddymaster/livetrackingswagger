/**
 * SocketsController
 *
 * @description :: Server-side logic for managing Sockets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    subscribeForEvents:function(req,res){
        if(req.isSocket) {
            var events = req.param('events');
            if(events && events.length != 0){
                for(var i=0;i<events.length;i++){
                    console.log(events[i]);
                    sails.sockets.join(req.socket,events[i]);
                }
            }
            res.ok();
        }else{
            res.badRequest();
        }
    }
};

