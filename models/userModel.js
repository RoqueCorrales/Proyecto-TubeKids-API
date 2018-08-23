const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const user = new Schema({
    name: {type: String, required: "El nombre es obligatorio"},
    lastName: {type: String, required: "El apellido es obligatorio"},
    country: { type: String },
    password: {type: String, required: "El contrasenna es obligatorio",minlength:[8,"Contrasenna es muy corta"]},
    birthDate: {type: String, required: "La fecha de nacimiento es obligatorio"},
    email: {type: String, required: "El correo es obligatorio"},
    admin: {type: Boolean },
    approvalstatus:{type:Boolean,default:false},
    isVerificated:{type:Boolean,default:false}


    
});

module.exports = mongoose.model('users', user);