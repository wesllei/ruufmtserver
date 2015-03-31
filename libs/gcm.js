var GcmCore = require('node-gcm');
var config = require('../config');
var User = require('../models/user')

var Gcm = function () {
    this.sender = new GcmCore.Sender(config.gcm.apiKey);
}

Gcm.prototype.send = function (text) {
    var scope = this;
    var user = new User();
    user.getAll(function (resul) {
        
        var usersIds = [];
        while (resul.length > 0) {

            usersIds.push(resul[0].key);
            resul.shift();
        }
        
        while (usersIds.length > 0) {
            var usersList = usersIds.splice(0, 1000);
            var message = new GcmCore.Message({
                collapseKey: 'demo',
                delayWhileIdle: true,
                timeToLive: 3
            });
            console.log(message);
            message.addData('message', text);
            scope.sender.send(message, usersList, 10, function (err, result) {
                console.log('qualquer coisa');
                if (err) console.error(err);
                else console.log(result);
            });
        }
    });
}

module.exports = Gcm;