const express = require('express');
const rsvpController = require('./controllers/rsvpController');
const songRequestController = require('./controllers/songRequestController');

const router = express.Router();

router.get('/', rsvpController.home);
router.get('/respond', rsvpController.redirectHome);
router.post('/respond', rsvpController.saveResponse);
router.get('/thank-you', rsvpController.thankYou);
router.get('/music', songRequestController.newSongRequest);
router.post('/music', songRequestController.createSongRequest);

module.exports = router;
