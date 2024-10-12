const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');
const Song = require('../models/song');

router.get('/', songController.getIndex);
router.post('/submit-song', songController.postSong);

router.get('/play', async (req, res) => {
    const { difficulty } = req.query;
    let song;

    try {
        if (difficulty) {
            song = await Song.aggregate([
                { $match: { difficulty: difficulty } },
                { $sample: { size: 1 } }
            ]);
        } else {
            song = await Song.aggregate([
                { $sample: { size: 1 } }
            ]);
        }

        if (song.length > 0) {
            res.render('play', { song: song[0], difficulty });
        } else {
            res.render('play', { song: null, difficulty });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.get('/create-video', async (req, res) => {
    const { difficulty } = req.query;
    let song;

    try {
        if (difficulty) {
            song = await Song.find({ difficulty: difficulty });
        } else {
            song = await Song.find({});
        }

        if (song.length > 0) {
            const randomIndex = Math.floor(Math.random() * song.length);
            res.json(song[randomIndex]);
        } else {
            res.status(404).send('No songs available!');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
