var mongoose = require('mongoose');
var Video = mongoose.model('videos');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var path = require('path');




//Get - Return all Videos in the db

/**
 * Retorna todos los videos en la base de datos
 * @method findAllVideos
 * @param {} req request proveniente del cliente
 * @param {} res response saliente al cliente
 * @return  todos los videos guardados en la base de datos
 */
exports.findAllVideos = function (req, res) {

    Video.find(function (err, videos) {
        if (err) {
            res.status(422);
            res.json({ error: err });
        }
        res.status(200);
        res.json(videos);
    });
};

// retun a specific video
/**
 * Retorna un especifico video
 * @method findById
 * @param {} req request proveniente del cliente
 * @param {} res response saliente al cliente
 * @return video solicitado
 */
exports.findById = function (req, res) {
    Video.findById(req.params.id, function (err, video) {
        if (err) {
            res.status(422);
            res.json({ error: err });
        }
        res.status(200);
        res.json(video);
    });

};

// create a new video

/**
 * Agrega un nuevo video
 * @method addVideo
 * @param {} req request proveniente del cliente
 * @param {} res response saliente al cliente
 * @return devuelve video guardado + codigo
 */
exports.addVideo = function (req, res) {

    var video = new Video();

    video.name = req.body.name;
    video.name = video.name.toLowerCase();

    video.detail = req.body.detail;
    video.userId = req.body.userId;
    video.url = req.body.url;
    video.approvalstatus = true;
    video.agePermission = req.body.agePermission;

    video.local = req.body.local;

    video.save(function (err) {
        if (err) {
            res.status(422);
            res.json({ error: err });
        }
        res.status(201);
        res.json(video);
    });
};

// Put - Update a Video


/**
 * Actualiza VIdeo
 * @method updateVideo
 * @param {} req request proveniente del cliente
 * @param {} res response saliente al cliente
 * @return VIdeo actualizado
 */
exports.updateVideo = function (req, res) {
    var update = req.body;
    Video.findByIdAndUpdate(req.params.id, update, (err, videoUpdated) => {

        if (err) {
            res.status(500).send({ message: 'Error al actualizar el video' });

        } else {
            if (!videoUpdated) {
                res.status(404).send({ message: 'No se ha podido actualizar el video' });
            } else {
                res.status(200).send({ message: 'Video  Actualizado' });
            }
        }


    });
}

// updateVideoLocal
/**
 * Actualiza un video en forma local
 * @method updateVideoLocal
 * @param {} req request proveniente del cliente
 * @param {} res response saliente al cliente
 * @return codigo + mensaje y json del objeto
 */
exports.updateVideoLocal = function (req, res) {
    var update = req.body;

    if (!req.files)
        return res.status(400).send('No hay archivos para subir.');

    // The name of the file
    let sampleFile = req.params.id;

    // move to the dir
    sampleFile.mv('/uploads/videos', function (err) {
        if (err)
            return res.status(500).send(err);
    });
    VIdeo.findByIdAndUpdate(req.params.id, update, (err, videoUpdated) => {

        if (err) {
            res.status(500).send({ message: 'Error al actualizar el video' });

        } else {
            if (!videoUpdated) {
                res.status(404).send({ message: 'No se ha podido actualizar el video' });
            } else {
                res.status(200).send({ video: videoUpdated });
            }
        }


    });
}

// Delete a video

/**
 * DActualiza un video que sera eliminado 
 * @method deleteVideo
 * @param {} req request proveniente del cliente
 * @param {} res response saliente al cliente
 * @return codigo + mensaje
 */
exports.deleteVideo = function (req, res) {


    Video.findByIdAndRemove(req.params.id, (err, videoRemoved) => {

        if (err) {
            res.status(500).send({ message: 'Error al elimiar video' });

        } else {
            if (!videoRemoved) {
                res.status(404).send({ message: 'No se ha podido eliminar el video' });
            } else {
                res.status(200).send({ message: 'Video eliminado' });
            }
        }


    });
}
// subir archivo video localmente



/**
 * Subir archivo en forma local haciendo una actualizacion
 * @method uploadFile
 * @param {} filename
 * @return un path
 */
function uploadFile(filename) {



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


/**
 * Actualiza un video
 * @method uploadVideo
 * @param {} req con datos del file
 * @return un boolean false si no hay permisos, true si si lo logra.
 */
function uploadVideo(req) {
    let EDFile = req.files.file
    EDFile.mv(`./uploads/videos/${EDFile.name}`, err => {
        if (err) return false;

        return true;
    })
}

// retun a specific video
/**
 * Retorna un especifico video
 * @method findByName
 * @param {} req request proveniente del cliente
 * @param {} res response saliente al cliente
 * @return video solicitado
 */
exports.findByName = function (req, res) {

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("api");
        var query = { name: req.params.name };
        dbo.collection("videos").find(query).toArray(function (err, videos) {
            if (err) {
                res.status(422).send({ message: 'Error al buscar por nombre.' });
            }
            db.close();
            res.status(200).send({ videos });


        });
    });

};