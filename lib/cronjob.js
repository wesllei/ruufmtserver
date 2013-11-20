var cronJob = require('cron').CronJob;
var request = require('request');
var http = require("http");
var processCardapio = require('./processcardapio.js');

function CronJob(time) {
	this.time = time;
}

CronJob.prototype.start = function(callback) {
	new cronJob('30 * * * * *', function() {
		var request_options = {
			uri : 'http://www.ufmt.br/ufmt/unidade/index.php/secao/visualizar/3793/RU',
			headers : {
				'user-agent' : 'Mozilla/5.0 (Windows NT 6.0) AppleWebKit/536.5 (KHTML, like Gecko)',
				'Accept-Language' : 'pt'
			},
			encoding : "utf-8"
		};

		request(request_options, function(error, response, html) {
			if (html) {
				callback(html, function(data,scrape) {
					processCardapio(data,JSON.parse(scrape));
				});
			} else {
				console.log(error);
			}
		}); 

	}, null, true, null);
};
module.exports = CronJob;
