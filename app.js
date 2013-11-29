/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var cardapio = require('./routes/cardapio');
var http = require('http');
var path = require('path');
var gcm = require('node-gcm');
var mongoose = require('mongoose');
var cronjob = require('./lib/cronjob.js');
var scrape = require('./lib/scrapecardapio.js');
var processCardapio = require('./lib/processcardapio.js');

mongoose.connect('mongodb://localhost/ruufmt');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
});

var app = express();

// all environments
app.set('port', process.env.PORT || 8000);
app.set('domain', '192.168.96.99');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}


//mapping
app.get('/', routes.index);
app.get('/user/add/:id', user.add);
app.get('/cardapio/last', cardapio.last);

//Models



//Cron job
var job = new cronjob();
job.start(scrape);


http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' +app.get('ip')+':'+app.get('port'));
});
