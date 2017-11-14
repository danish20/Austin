var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var sprint = require('../Model/sprint.js');
// var Type = require('type-of-is');
var sprintGlobal = require('../Model/sprintGlobal.js');

router.get('/sprint/:id', function(req,res,next){
    sprint.findById(req.params.id, function(err,post){
        if(err) return next(err);
        res.json(post);
    });
});

router.get('/velocityGraph', function(req,res,next){
    sprintGlobal.findOne({},{"_id":false,"velocity_graph_url":true}, function(err,post){
        if(err) return next(err);
        res.json(post);
    });
});

router.get('/sprintPerfComparison', function(req,res,next){
    sprintGlobal.findOne({},{"_id":false,"sprints_performance_comparison_graph":true}, function(err,post){
        if(err) return next(err);
        res.json(post);
    });
});

router.get('/teamPerformance', function(req,res,next){
    sprintGlobal.findOne({},{"_id":false,"teamPerformance_graph_url":true}, function(err,post){
        if(err) return next(err);
        res.json(post);
    });
});

router.get('/sprintById/:id', function(req,res,next){
    var id = req.params.id;
    sprint.findOne({"sprintId":id}, function(err,post){
        if(err) return next(err);
        res.json(post);
    });
});

router.get('/burnDownChart/:id', function(req,res,next){
    var id = req.params.id;
    sprint.findOne({"sprintId":id},{"_id":false,"burndown_img_url":true}, function(err,post){
        if(err) return next(err);
        res.json(post);
    });
});

router.get('/taskPerformance/:id', function(req,res,next){
    var id = req.params.id;
    sprint.find({"sprintId":id},{"_id":false,"task_performance_img_url":true}, function(err,post){
        if(err) return next(err);
        res.json(post);
    });
});

router.get('/bestPerformance/:id', function(req,res,next){
    var id = req.params.id;
    sprint.findOne({"sprintId":id},{"_id":false,"best_performance_img_url":true}, function(err,post){
        if(err) return next(err);
        res.json(post);
    });
});

router.get('/sprintStatus/:id', function(req,res,next){
    var id = req.params.id;
    sprint.findOne({"sprintId":id},{"_id":false,"sprint_status_img_url":true}, function(err,post){
        if(err) return next(err);
        res.json(post);
    });
});

router.get('/userPerformance/:sprintId/:userId', function(req,res,next){
    var sprintId = req.params.sprintId;
    var userId = req.params.userId;
    var performance = "";
    sprint.findOne({"sprintId":sprintId, 'team_member.user_id': userId},{"_id":false, "team_member":true}, function(err,post){
        if(err) return next(err);
        var result = {
            performance_chart_url: null
        };
        var output = post.team_member;
        for(var i = 0 ; i <output.length;i++){
            if(output[i].user_id == userId){
                result.performance_chart_url = output[i].performance_chart_url;
            }
        }
        //console.log(result);
        res.json(result);
    });
});

router.get('/sprint', function(req,res,next){
    sprint.find({}, function(err,post){
        console.log(post);
        if(err) return next(err);
        res.json(post);
    });
});



router.post('/insertsprint',function(req,res,next){
    sprint.create(req.body, function(err, post){
        if(err) return next(err);
        res.json(post);
    });
});

router.post('/select',function(req,res,next){
   console.log(req);
});

module.exports = router;