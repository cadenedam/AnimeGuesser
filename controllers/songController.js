const Song = require('../models/song');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).fields([{ name: 'songFile', maxCount: 1 }, { name: 'videoFile', maxCount: 1 }]);

exports.getIndex = (req, res) => {
    res.render('index');
};

exports.postSong = (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            return res.status(500).send("Error uploading files");
        }

        const newSong = new Song({
            title: req.body.title,
            artist: req.body.artist,
            show: req.body.show,
            difficulty: req.body.difficulty,
            filePath: req.files['songFile'][0].path,
            videoPath: req.files['videoFile'] ? req.files['videoFile'][0].path : null  // Save the video file path if it exists
        });

        newSong.save()
            .then(() => res.redirect('/'))
            .catch(err => res.status(500).send("Error saving song to database"));
    });
};

exports.getPlay = async (req, res) => {
    try {
        const count = await Song.countDocuments().exec();
        const random = Math.floor(Math.random() * count);
        const song = await Song.findOne().skip(random).exec();
        console.log(song);
        res.render('play', { song });
    } catch (err) {
        res.status(500).send(err);
    }
};
