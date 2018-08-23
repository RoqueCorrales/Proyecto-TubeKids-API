var mongoose = require('mongoose');
var Profile = mongoose.model('profiles');



//Get - Return all Profiles in the db

/**
 * Retorna todos los perfiles de la base de datos.
 * @method findAllProfiles
 * @param {} req request proveniente del cliente
 * @param {} res response saliente al cliente
 * @return lista de perfiles
 */
exports.findAllProfiles = function (_req, res) {

    Profile.find(function (err, profiles) {
        if (err) {
            res.status(422);
            res.json({ error: err });
        }
        res.status(200);
        res.json(profiles);
    });
};

// retun a specific profile
/**
 * Retorna un especifico perfil
 * @method findById
 * @param {} req request proveniente del cliente
 * @param {} res response saliente al cliente
 * @return perfil solicitado
 */
exports.findById = function (req, res) {
    Profile.findById(req.params.id, function (err, profile) {
        if (err) {
            res.status(422);
            res.json({ error: err });
        }
        res.status(200);
        res.json(profile);
    });

};

// create a new profile

/**
 * CRea un nuevo perfil
 * @method addProfile
 * @param {} req request proveniente del cliente
 * @param {} res response saliente al cliente
 * @return  un nuevo perfil agregado
 */
exports.addProfile = function (req, res) {

  
    var profile = new Profile();

    profile.name = req.body.name;
    profile.userName = req.body.userName;
    profile.pin = req.body.pin;
    profile.birthDate = req.body.birthDate;
    profile.approvalstatus = true;


    profile.save(function (err) {
        if (err) {
            res.status(422);
            res.json({ error: err });
        }
        res.status(201);
        res.json(profile);
    });
};

// Put - Update a Profile

/**
 * Actualiza un perfil 
 * @method updateProfile
 * @param {} req request proveniente del cliente
 * @param {} res response saliente al cliente
 * @return codigo mas mensaje.
 */
exports.updateProfile = function (req, res) {
    var update = req.body;
    Profile.findByIdAndUpdate(req.params.id,update,(err, profileUpdated)=>{

        if(err){
            res.status(500).send({message: 'Error al actualizar el profile'});

        }else{
            if(!profileUpdated){
                res.status(404).send({message: 'No se ha podido actualizar el profile'});
            }else{
                res.status(200).send({profile:profileUpdated});
            }
        }

        
    });
}



// Delete a profile

/**
 * Elimina un perfil, en si lo edita.
 * @method deleteProfile
 * @param {} req request proveniente del cliente
 * @param {} res response saliente al cliente
 * @return codigo + mensaje
 */
exports.deleteProfile = function (req, res) {
    req.body.approvalstatus = false;
    var update = req.body;
 
    User.findByIdAndUpdate(req.params.id,update,(err, profileUpdated)=>{
      
        if(err){
            res.status(500).send({message: 'Error al elimiar profile'});

        }else{
            if(!profileUpdated){
                res.status(404).send({message: 'No se ha podido eliminar el profile'});
            }else{
                res.status(200).send({message: 'Profile eliminado'});
            }
        }

        
    });
}