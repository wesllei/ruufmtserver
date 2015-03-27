var config = require('../config');
var inspect = require('util').inspect;
var Client = require('mariasql');

var client = new Client();
client.connect({
  host: config.db.host,
  user: config.db.user,
  password: config.db.pass
});

client.on('connect', function(){
    
})