const SongRequest = require('../models/SongRequest');

exports.newSongRequest = (req, res) => {
  res.render('music', { flash: req.flash('flash') });  
};

exports.createSongRequest = (req, res) => {
  const newSongRequest = new SongRequest(req.body);

  console.log(newSongRequest);

  newSongRequest.save((err) => {
    if (err) {
      const errorKeys = Object.keys(err.errors);
      errorKeys.forEach(key => req.flash('flash', { type: 'error', message: err.errors[key].message }));
      const errorMessages = errorKeys.map(key => err.errors[key].message);
      console.log(errorMessages);
      res.json({ type: 'error', messages: errorMessages });
    } else {
      res.json({ type: 'success', title: req.body.title, artist: req.body.artist });
    }
  });
};
