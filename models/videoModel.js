const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const video = new Schema({
    name: { type: String },
    detail: { type: String },
    userId:  { type: Schema.ObjectId, ref: 'User' },
    url:{type: String},
    local:{type:String},
    approvalstatus:{type:Boolean,default:false}
    
    

    
});

module.exports = mongoose.model('videos', video);