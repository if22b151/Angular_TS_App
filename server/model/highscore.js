const mongoose = require('mongoose');

const HighscoreSchema = new mongoose.Schema({
    highscore : {type: Number, default: '0', trim: true, required: true},
});

module.exports = mongoose.model("Highscore", HighscoreSchema);