var mongoose = require('mongoose');
var SongList = mongoose.model('playlists');




var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


//Get - Return all playlists in the db

/**
 * Return all the playlists on the database.
 * @method findAllPlaylists
 * @param {} req request proveniente del cliente
 * @param {} res response saliente al cliente
 * @return JSON de playlists
 */
exports.findAllPlaylists = function (req, res) {

    SongList.find(function (err, playlists) {
        if (err) {
            res.status(422);
            res.json({ error: err });
        }
        res.status(200);
        res.json(playlists);
    });
};

// retun a specific playlist
/**
 * Encuentra a especifico playlist
 * @method findById
 * @param {} req request proveniente del cliente id
 * @param {} res response saliente al cliente
 * @return playlist solicitado.
 */
exports.findById = function (req, res) {
    SongList.findById(req.params.id, function (err, playlist) {
        if (err) {
            res.status(422);
            res.json({ error: err });
        }
        res.status(200);
        res.json(playlist);
    });

};

// create a new playlist

/**
 * crea una nueva playlist
 * @method addPlaylist
 * @param {} req request proveniente del cliente
 * @param {} res response saliente al cliente
 * @return playlisy agregada
 */
exports.addPlaylist = function (req, res) {

    var playlist = new SongList();

    playlist.userId = req.body.userId;
    playlist.videoId = req.body.videoId;



    playlist.save(function (err) {
        if (err) {
            res.status(422);
            res.json({ error: err });
        }
        res.status(201);
        res.json(playlist);
    });
};

// Put - Update a playlist


/**
 * Actualiza un playlist
 * @method updatePlaylist
 * @param {} req request proveniente del cliente
 * @param {} res response saliente al cliente
 * @return playlist actualizada.
 */
exports.updatePlaylist = function (req, res) {
    var update = req.body;
    SongList.findByIdAndUpdate(req.params.id, update, (err, playlistUpdated) => {

        if (err) {
            res.status(500).send({ message: 'Error al actualizar la playlist' });

        } else {
            if (!playlistUpdated) {
                res.status(404).send({ message: 'No se ha podido actualizar el video' });
            } else {
                res.status(200).send({ playlist: playlistUpdated });
            }
        }


    });
}



// Delete a video

/**
 * Elimina un video, en si lo pone en stand by.
 * @method deletePlaylist
 * @param {} req request proveniente del cliente
 * @param {} res response saliente al cliente
 * @return codigo y mesaje de exito o de igual manera si no se lograra completar.
 */
exports.deletePlaylist = function (req, res) {
    req.body.approvalstatus = false;
    var update = req.body;

    Video.findByIdAndUpdate(req.params.id, update, (err, videoUpdated) => {

        if (err) {
            res.status(500).send({ message: 'Error al elimiar video' });

        } else {
            if (!videoUpdated) {
                res.status(404).send({ message: 'No se ha podido eliminar el video' });
            } else {
                res.status(200).send({ message: 'Video eliminado' });
            }
        }


    });
}
//Get - Return all Profiles in the db

/**
 * Retorna todos los videos de un profile
 * @method findAllVideosWhereIDProfile
 * @param {} req request proveniente del cliente
 * @param {} res response saliente al cliente
 * @return lista de profiles
 */
exports.findAllVideosWhereIDProfile = function (req, res) {


    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("api");
        var query = { _id: req.params.id };
        dbo.collection("playlists").find(query).toArray(function (err, playlists) {
            if (err) {
                res.status(422).send({ message: 'Error al seleccion a la playlist' });
            }
            db.close();
            res.status(200).send({ playlists });


        });
    });
};