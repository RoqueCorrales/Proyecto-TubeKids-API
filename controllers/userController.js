var mongoose = require('mongoose');
var User = mongoose.model('users');
var bcrypt = require('bcryptjs');
var validator = require("email-validator");
var moment = require('moment');



var mailController = require('./mailController');


//Get - Return all Users in the db

/**
 * Description
 * @method findAllUsers
 * @param {} req
 * @param {} res
 * @return 
 */
exports.findAllUsers = function(req,res){

    User.find(function(err,users){
        if(err) {
            res.status(422);
            res.json({error: err});
        }
        res.status(200);
        res.json(users);
    });
};

// retun a specific user
/**
 * Description
 * @method findById
 * @param {} req
 * @param {} res
 * @return 
 */
exports.findById = function(req, res){
    User.findById(req.params.id, function(err,user){
        if(err) {
            res.status(422);
            res.json({error: err});
        }
        res.status(200);
        res.json(user);
    });

};

// create a new user

/**
 * Description
 * @method addUser
 * @param {} req
 * @param {} res
 * @return 
 */
exports.addUser = function(req, res){


    if(validator.validate(req.body.email)){

        if(  validarEdad(req.body.birthDate)){
            var hashedPassword = bcrypt.hashSync(req.body.password, 8);
   
            var user = new User();
        
           user.name = req.body.name;
          
       
           user.lastName = req.body.lastName;
           user.country = req.body.country;
           user.password = hashedPassword;
           //user.confirPassword = req.body.confirPassword;
           user.birthDate = req.body.birthDate;
           user.email = req.body.email;
           user.admin = req.body.admin;
           user.approvalstatus = true;
        
            
       
        
        
           user.save(function(err){
            if(err) {
                res.status(422);
                res.json({error: err});
            }
            var bodymail = {
                "email" :user.email,
                "link" : "localhost:3000/api/users/confirmationEmail/"+user.id,
        
                }
                console.log(bodymail);

            mailController.sendEmail(bodymail);
            res.status(201);
            res.json(user);
        });
        }else{
            res.status(422).send({message: 'Sos menor de edad'});
        }
       
    }else{
        res.status(422).send({message: 'Correo no valido'});

    }

};



// Validar edad
/**
 * Description
 * @method validarEdad
 * @param {} fecha
 * @return 
 */
function validarEdad(fecha){
  
    var m = moment(fecha, "MM-DD-YYYY");
    edad = m.fromNow().split(" ")[0];
    
    if(edad<18){
    
        return false
       
    }else{
     
        return true

       
    }


};



// Put - Update a user

/**
 * Description
 * @method updateUser
 * @param {} req
 * @param {} res
 * @return 
 */
exports.updateUser = function(req,res){
    var update = req.body;
    User.findByIdAndUpdate(req.params.id,update,(err, userUpdated)=>{
      
        if(err){
            res.status(500).send({message: 'Error al actualizar el usuario'});

        }else{
            if(!userUpdated){
                res.status(404).send({message: 'No se ha podido actualizar el usuario'});
            }else{
                res.status(200).send({user:userUpdated});
            }
        }

        
    });
}

// Delete a user

/**
 * Description
 * @method deleteUser
 * @param {} req
 * @param {} res
 * @return 
 */
exports.deleteUser = function(req, res){
    req.body.approvalstatus = false;
    var update = req.body;
 
    User.findByIdAndUpdate(req.params.id,update,(err, userUpdated)=>{
      
        if(err){
            res.status(500).send({message: 'Error al elimiar usuario'});

        }else{
            if(!userUpdated){
                res.status(404).send({message: 'No se ha podido eliminar el usuario'});
            }else{
                res.status(200).send({user:userUpdated});
            }
        }

        
    });
}


/**
 * Description
 * @method updateUserConfirmation
 * @param {} req
 * @param {} res
 * @return 
 */
exports.updateUserConfirmation = function(req,res){
    req.body.isVerificated = true;
    var update = req.body;
    User.findByIdAndUpdate(req.params.id,update,(err, userUpdated)=>{
      
        if(err){
            res.status(500).send({message: 'Error al confirmar el usuario'});

        }else{
            if(!userUpdated){
                res.status(404).send({message: 'No se ha podido confirmar la cuenta'});
            }else{
                res.status(200).send({message: 'Confirmacion exitosa, BIENVENIDO A TUBEKIDS'});
            }
        }

        
    });
}



