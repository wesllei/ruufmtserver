var express = require('express');
var router = express.Router();
var Meal = require('../models/meal');

/* GET home page. */
router.get('/', function (req, res, next) {
    var data = {};
    lunch = new Meal(0);
    dinner = new Meal(1);
    saturday = new Meal(2);
    lunch.getLast(function () {
        dinner.getLast(function () {
            saturday.getLast(function () {
                var data = {}
                data.lunch = lunch.getPureData(true);
                data.dinner = dinner.getPureData(true);
                data.saturday = saturday.getPureData(true);
                res.json(data);
            })
        })
    })
});
router.get('/refresh', function (req, res, next) {
    var Scraper = require('../libs/scraper');
    var request = require('request');
    var config = require('../config');
    var http = require("http");
    var options = {
        uri: config.sc.url,
        headers: config.sc.htmlHeader,
        encoding: config.sc.htmlEncoding
    };
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var scrap = new Scraper(body);
            scrap.proccess();
            res.jsonp({
                message: "refresh in curse"
            });
        }
    });
});
module.exports = router;