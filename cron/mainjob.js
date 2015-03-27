var CronJob = require('cron').CronJob;
var scraper = require('../libs/scraper');
var request = require('request');
var config = require('../config');

var mainjob = function () {
    this.job = new CronJob('00 0-30 8-12 * * 1-5', function () {
    //var job = new CronJob('1-60 * * * * *', function () {
        var http = require("http");
        var options = {
            uri: config.sc.url,
            headers: config.sc.htmlHeader,
            encoding: config.sc.htmlEncoding
        };
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                scraper(body);
            }
        });
    }, null, true, null);
};
module.exports = mainjob