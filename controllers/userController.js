var mongoose = require('mongoose');
var User = mongoose.model('users');
var bcrypt = require('bcryptjs');
var validator = require("email-validator");
var moment = require('moment');



var mailController = require('./mailController');


//Get - Return all Users in the db

/**
 * Retorna todos los usuarios de la base de datos
 * @method findAllUsers
 * @param {} req request proveniente del cliente
 * @param {} res response saliente al cliente
 * @return retorna codigo + json de los usuarios
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
 * SOlicita un usuario en especifico
 * @method findById
 * @param {} req request proveniente del cliente id
 * @param {} res response saliente al cliente
 * @return usuario solicitado
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
 * crea un nuevo usuario
 * @method addUser
 * @param {} req request proveniente del cliente
 * @param {} res response saliente al cliente
 * @return usuario insertado
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
                

            mailController.sendEmail(bodymail);
            res.status(201);
            res.json(user);
        });
        }else{
            res.status(401).send({message: 'Sos menor de edad'});
        }
       
    }else{
        res.status(422).send({message: 'Correo no valido'});

    }

};



// Validar edad
/**
 * Valida la edad
 * @method validarEdad
 * @param {} fecha
 * @return un boolean.
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
 * Actualiza un usuario en especifico
 * @method updateUser
 * @param {} req request proveniente del cliente
 * @param {} res response saliente al cliente
 * @return codigo + usuario actualizado
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
 * Elimina un usuario, cambia una propiedad para no eliminarla de la base de datos.
 * @method deleteUser
 * @param {} req request proveniente del cliente
 * @param {} res response saliente al cliente
 * @return codigo + mensaje
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
                res.status(200).send({message: 'Usuario eliminado con exito'});
            }
        }

        
    });
}


/**
 * Actualiza el usuario despues del la confirmacion del email.
 * @method updateUserConfirmation
 * @param {} req request proveniente del cliente
 * @param {} res response saliente al cliente
 * @return codigo + mensaje
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



