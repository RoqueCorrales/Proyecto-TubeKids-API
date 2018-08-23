const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profile = new Schema({
    name: { type: String, required: "El nombre es obligatorio" },
    userName: { type: String, required: "El nombre de usuario es obligatorio" },
    userId: { type: Schema.ObjectId, ref: 'User' },
    pin: { type: String, required: "El PIN es obligatorio" },
    birthDate: { type: String },
    approvalstatus: { type: Boolean, default: false }

});

module.exports = mongoose.model('profiles', profile);