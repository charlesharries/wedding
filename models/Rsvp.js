const mongoose = require('mongoose');

const rsvpSchema = new mongoose.Schema({
  respondant: {
    type: String,
    trim: true,
    // unique: true,
    lowercase: true,
    required: 'Please let us know who you are'
  },
  havePartner: {
    type: Boolean,
    required: 'Is anyone coming with you?',
  },
  partnerName: {
    type: String,
    trim: true,
    lowercase: true,
  },
  attending: {
    type: Boolean,
    required: 'Please let us know if you\'re attending',
  },
  needsTransportation: {
    type: Boolean,
    required: 'Please let us know if you need transportation',
  },
  hasDietaryRequirements: {
    type: Boolean,
    required: 'Please let us know if you have any dietary requirements',
    trim: true,
  },
  dietaryRequirements: String,
  accommodation: {
    type: String,
    required: 'Would you like to stay overnight at the castle?',
  },
  responded: {
    type: Date,
    default: Date.now(),
  },
});

// Validate uniqueness, the proper way
rsvpSchema.path('respondant').validate({
  isAsync: true,
  // SAME AS validator: function(value, respond) {}
  validator(value, respond) {
    this.model('Rsvp').count({ respondant: value }, (err, count) => {
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
