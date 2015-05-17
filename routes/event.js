var express = require('express');
var router = express.Router();
var Event = require('../models/event');

/* GET home page. */
router.get('/', function (req, res, next) {
    var data = {};
   
});
router.get('/list', function (req, res, next) {
    var event = new Event();
    event.getList(function(list){
        var json = {}
        json.events = list;
        res.json(json);
    })
});

router.get('/send/:id', function (req, res, next) {
    var event = new Event();
    event.getByParans({idevent:req.params.id},function(list){
        if(list != null && list.length >0){
            console.log(list);
            var msg = {}
            msg.event = list[0];
            var GcmCore = require('../libs/gcm');
            var gcm = new GcmCore();
            gcm.send(msg,"newEvent");
            res.jsonp({success:true})
        }
    })
});
module.exports = router;