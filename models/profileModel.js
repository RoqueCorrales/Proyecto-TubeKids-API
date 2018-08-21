const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profile = new Schema({
    name: { type: String },
    userName:{type: String},
    pin:{type:String},
    birthDate:{type:String},
    approvalstatus:{type:Boolean,default:false}
    
});

module.exports = mongoose.model('profiles', profile);