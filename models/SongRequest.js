const mongoose = require('mongoose');

const songRequestSchema = new mongoose.Schema({
  artist: {
    type: String,
    required: 'Who sings that song?',
    trim: true,
  },
  title: {
    type: String,
    required: 'What song would you like to hear?',
    trim: true,
  },
});

module.exports = mongoose.model('SongRequest', songRequestSchema);
