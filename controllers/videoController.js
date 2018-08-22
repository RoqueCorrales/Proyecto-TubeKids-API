var mongoose = require('mongoose');
var Video = mongoose.model('videos');


var path = require('path');



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

    var video = new Video();

   video.name = req.body.name;
  

   video.detail = req.body.detail;
   video.userId = req.body.userId;
   video.url = req.body.url;
   video.approvalstatus = true;
   video.agePermission = req.body.agePermission;

   video.local =req.body.local;
  
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
    var update = req.body;
    VIdeo.findByIdAndUpdate(req.params.id,update,(err, videoUpdated)=>{
      
        if(err){
            res.status(500).send({message: 'Error al actualizar el video'});

        }else{
            if(!videoUpdated){
                res.status(404).send({message: 'No se ha podido actualizar el video'});
            }else{
                res.status(200).send({video:videoUpdated});
            }
        }

        
    });
}

// updateVideoLocal
exports.updateVideoLocal = function(req,res){
    var update = req.body;
    
    if (!req.files)
    return res.status(400).send('No hay archivos para subir.');
 
  // The name of the file
  let sampleFile = req.params.id;
 
  // move to the dir
  sampleFile.mv('/uploads/videos', function(err) {
    if (err)
      return res.status(500).send(err);
  });
    VIdeo.findByIdAndUpdate(req.params.id,update,(err, videoUpdated)=>{
      
        if(err){
            res.status(500).send({message: 'Error al actualizar el video'});

        }else{
            if(!videoUpdated){
                res.status(404).send({message: 'No se ha podido actualizar el video'});
            }else{
                res.status(200).send({video:videoUpdated});
            }
        }

        
    });
}

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
// subir archivo video localmente



function uploadFile(filename){
    
    

	if (filename) {
		
        var file_path = filename.path; //fichero el cual va a subir
        var file_split = file_path.split('\/'); //recortar para obtener el nombre de la imagen
        var file_name = file_split[2]; //se recoje el campo 3 del arreglo, porque ahi se encuentra el nombre de la imagen

        var ext_split = file_name.split('\.'); //se recorta para obtner la extencion del archivo
        var file_ext = ext_split[1]; //se recoje el campo 2. porque ahi esta la extencion despues del split

		if (file_ext == 'mp4' || file_ext == 'avi' || file_ext == 'm4v') {

            
       return file_name;
    }
}
}


function uploadVideo(req){
    let EDFile = req.files.file
    EDFile.mv(`./uploads/videos/${EDFile.name}`,err => {
        if(err) return false;

        return true;
    })
}