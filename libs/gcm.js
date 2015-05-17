var GcmCore = require('node-gcm');
var config = require('../config');
var User = require('../models/user')

var Gcm = function () {
    this.sender = new GcmCore.Sender(config.gcm.apiKey);
}

Gcm.prototype.send = function (text,collapseKey) {
    var scope = this;
    var user = new User({});
    user.getAll(function (resul) {
        for (i = 0; i < resul.length; i++) {
            scope.sendToDevice(text,resul[i].keyuser,collapseKey)
        }
    });
}
Gcm.prototype.sendToDevice = function(text, keyuser,collapseKey) {
    var message = new GcmCore.Message({
        collapseKey:  collapseKey,
        delayWhileIdle: true,
        timeToLive: 10800,
        data: {
            message: text
        }
    });
    this.sender.sendNoRetry(message, keyuser, function (err, result) {
        if (err) console.error(err);
        else{
            if(result.results[0].registration_id != NaN && result.results[0].registration_id != null){
                var user = new User({keyuser:keyuser});
                user.updateIfNotExist(result.results[0].registration_id);
            }
        } 
    });
}
module.exports = Gcm;