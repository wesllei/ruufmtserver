var express = require('express');
var router = express.Router();
var Meal = require('../models/meal');

/* GET home page. */
router.get('/', function (req, res, next) {
    var data = {};
   
});
router.get('/list', function (req, res, next) {
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
module.exports = router;