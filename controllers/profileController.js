var mongoose = require('mongoose');
var Profile = mongoose.model('profiles');



//Get - Return all Profiles in the db

/**
 * Description
 * @method findAllProfiles
 * @param {} _req
 * @param {} res
 * @return 
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
 * Description
 * @method findById
 * @param {} req
 * @param {} res
 * @return 
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
 * Description
 * @method addProfile
 * @param {} req
 * @param {} res
 * @return 
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
 * Description
 * @method updateProfile
 * @param {} req
 * @param {} res
 * @return 
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
 * Description
 * @method deleteProfile
 * @param {} req
 * @param {} res
 * @return 
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
                res.status(200).send({profile:profileUpdated});
            }
        }

        
    });
}