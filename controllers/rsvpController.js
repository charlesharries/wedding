const Rsvp = require('../models/Rsvp');

exports.home = (req, res) => {
  res.render('home', { flash: req.flash('flash') });
};

exports.rsvp = (req, res) => {
  res.render('invitation', { flash: req.flash('flash') });
};

exports.redirectHome = (req, res) => {
  res.redirect('/');
};

exports.saveResponse = (req, res) => {
  const newRsvp = new Rsvp(req.body);

  newRsvp.save((err) => {
    if (err) {
      const errorKeys = Object.keys(err.errors);
      errorKeys.forEach(key => req.flash('flash', { type: 'error', message: err.errors[key].message }));
      res.redirect('/');
    } else {
      res.redirect('/thank-you');
    }
  });
};

exports.thankYou = (req, res) => {
  res.render('thank-you', { flash: req.flash('flash') });
};
