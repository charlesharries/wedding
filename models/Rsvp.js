const mongoose = require('mongoose');

const rsvpSchema = new mongoose.Schema({
  respondant: {
    type: String,
    trim: true,
    // unique: true,
    lowercase: true,
    required: 'Please let us know who you are',
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: 'We need an email address to contact you.',
  },
  havePartner: {
    type: Boolean,
    default: false,
  },
  partnerName: {
    type: String,
    trim: true,
    lowercase: true,
    default: 'guest',
  },
  attending: {
    type: Boolean,
    required: 'Please let us know if you can make it or not.',
  },
  needsTransportation: {
    type: Boolean,
    required: function() {
      console.log(this.attending)
      return this.attending;
    },
  },
  hasDietaryRequirements: {
    type: Boolean,
    required: function() {
      return this.attending;
    },
    trim: true,
  },
  dietaryRequirements: String,
  accommodation: {
    type: String,
    required: function() {
      return this.attending;
    },
  },
  responded: {
    type: Date,
    default: Date.now(),
  },
});

// Validate uniqueness, the proper way
rsvpSchema.path('email').validate({
  isAsync: true,
  // SAME AS validator: function(value, respond) {}
  validator(value, respond) {
    this.model('Rsvp').count({ email: value }, (err, count) => {
      if (err) {
        return respond(err);
      }
      // If `count` is greater than zero, 'invalidate'
      return respond(!count);
    });
  },
  message: 'It looks like you\'ve already responded!',
});

module.exports = mongoose.model('Rsvp', rsvpSchema);
