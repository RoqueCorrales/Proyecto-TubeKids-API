const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlist = new Schema({
    userId: { type: Schema.ObjectId, ref: 'Profile' },
    videoId: { type: Schema.ObjectId, ref: 'Video' }

});

module.exports = mongoose.model('playlists', playlist);