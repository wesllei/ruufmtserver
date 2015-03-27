var GcmCore = require('node-gcm');
var config = require('../config');

var Gcm = function () {
    console.log(config.gcm.apiKey);
    this.sender = new GcmCore.Sender(config.gcm.apiKey);
}

Gcm.prototype.send = function (text, ids) {


    var message = new GcmCore.Message({
        collapseKey: 'demo',
        delayWhileIdle: true,
        timeToLive: 3
    });
    message.addData('message', text);
    
    console.log(message);
    this.sender.send(message, ids, 10, function (err, result) {
        if (err) console.error(err);
        else console.log(result);
    });
}

module.exports = Gcm;