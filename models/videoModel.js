const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const video = new Schema({
    name: { type: String, required: "El nombre es obligatorio" },
    detail: { type: String },
    userId: { type: Schema.ObjectId, ref: 'User' },
    url: { type: String, required: "El URL es obligatorio" },
    local: { type: String },
    approvalstatus: { type: Boolean, default: false },
    agePermission: { type: Number }


});

module.exports = mongoose.model('videos', video);