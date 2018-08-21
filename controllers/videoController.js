var mongoose = require('mongoose');
var Video = mongoose.model('videos');

//const express = require('express');

//app.use(express.json());


//Get - Return all Users in the db

exports.findAllVideos = function(req,res){

    Video.find(function(err,videos){
        if(err) {
            res.status(422);
            res.json({error: err});
        }
        res.status(200);
        res.json(videos);
    });
};

// retun a specific video
exports.findById = function(req, res){
    Video.findById(req.params.id, function(err,video){
        if(err) {
            res.status(422);
            res.json({error: err});
        }
        res.status(200);
        res.json(video);
    });

};

// create a new video

exports.addVideo = function(req, res){

    
    var video = new VIdeo();

   video.name = req.body.name;
   console.log(req.body.name);

   video.detail = req.body.detail;
   video.userId = req.body.userId;
   video.url = req.body.url;
   video.local = req.body.local;
   video.approvalstatus = true;

  
   video.save(function(err){
    if(err) {
        res.status(422);
        res.json({error: err});
    }
    res.status(201);
    res.json(video);
});
};

// Put - Update a Video

exports.updateVideo = function(req,res){
    Video.findById(req.params.id, function(err,video){
       

        video.name = req.body.name;
   
   video.detail = req.body.detail;
   video.userId = req.body.userId;
   video.url = req.body.url;
   video.local = req.body.local;
   video.approvalstatus = true;
        video.save(function(err, video){
            if(err) {
                res.status(422);
                res.json({error: err});
            }
            res.status(201);
            res.json(video);
        });
    });
};

// Delete a video

exports.deleteVideo = function(req, res){
    req.body.approvalstatus = false;
    var update = req.body;
 
    Video.findByIdAndUpdate(req.params.id,update,(err, videoUpdated)=>{
      
        if(err){
            res.status(500).send({message: 'Error al elimiar video'});

        }else{
            if(!videoUpdated){
                res.status(404).send({message: 'No se ha podido eliminar el video'});
            }else{
                res.status(200).send({video:videoUpdated});
            }
        }

        
    });
}