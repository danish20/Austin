var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var sprint = require('../Model/sprint.js');

router.get('/sprint/:id', function(req,res,next){
    sprint.findById(req.params.id, function(err,post){
        if(err) return next(err);
        res.json(post);
    });
});

router.get('/sprint', function(req,res,next){
    sprint.find({}, function(err,post){
        if(err) return next(err);
        res.json(post);
    });
});


router.post('/',function(req,res,next){
    sprint.create(req.body, function(err, post){
        if(err) return next(err);
        res.json(post);
    });
});

module.exports = router;