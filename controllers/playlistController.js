var Playlist = require('../models/playlistModel');

//Get - Return all playlists in the db

exports.findAllPlaylists = function(req,res){

    Playlist.find(function(err,playlists){
        if(err) {
            res.status(422);
            res.json({error: err});
        }
        res.status(200);
        res.json(playlists);
    });
};

// retun a specific playlist
exports.findById = function(req, res){
    Playlist.findById(req.params.id, function(err,playlist){
        if(err) {
            res.status(422);
            res.json({error: err});
        }
        res.status(200);
        res.json(playlist);
    });

};

// create a new playlist

exports.addPlaylist = function(req, res){

    
    var playlist = new PLaylist();
    
    playlist.userId = req.body.userId;
    playlist.videoId = req.body.videoId;


  
   playlist.save(function(err){
    if(err) {
        res.status(422);
        res.json({error: err});
    }
    res.status(201);
    res.json(playlist);
});
};

// Put - Update a playlist


exports.updatePlaylist = function(req,res){
    var update = req.body;
    Playlist.findByIdAndUpdate(req.params.id,update,(err, playlistUpdated)=>{
      
        if(err){
            res.status(500).send({message: 'Error al actualizar la playlist'});

        }else{
            if(!playlistUpdated){
                res.status(404).send({message: 'No se ha podido actualizar el video'});
            }else{
                res.status(200).send({playlist:playlistUpdated});
            }
        }

        
    });
}



// Delete a video

exports.deletePlaylist = function(req, res){
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