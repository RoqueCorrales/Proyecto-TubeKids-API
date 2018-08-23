const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const token = new Schema({
    idser: { type: Schema.ObjectId, ref: 'User' },
    tok: { type: String }

});

module.exports = mongoose.model('tokens', token);