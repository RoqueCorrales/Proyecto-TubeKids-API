const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profile = new Schema({
    name: { type: String },
    userName:{type: String},
    userId:  { type: Schema.ObjectId, ref: 'User' },
    pin:{type:String},
    age:{type: Number},
    approvalstatus:{type:Boolean,default:false}
    
});

module.exports = mongoose.model('profiles', profile);