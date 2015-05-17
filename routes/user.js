var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

/* GET users listing. */
router.get('/add/:id', function (req, res, next) {
    user = new User({keyuser:req.params.id});
    user.save(function(success){
        if(success){
            res.json({message:"sucess"})
        }else{
            res.json({message:"fail"})
        }
    });
});

module.exports = router;