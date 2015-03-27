var express = require('express');
var router = express.Router();
var Meal = require('../models/meal');

/* GET home page. */
router.get('/', function (req, res, next) {
    var data = {};
    lunch = new Meal(0);
    dinner = new Meal(1);
    lunch.getLast(function(){
        dinner.getLast(function(){
            var data = {}
            data.lunch = lunch.getPureData(false);
            data.dinner = dinner.getPureData(false);
            res.json(data);
        })
    })
});

module.exports = router;