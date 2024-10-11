const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    show: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    videoPath: {
        type: String  // Optional, as not all songs may have an associated video
    }
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
