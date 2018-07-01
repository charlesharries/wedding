const express = require('express');
const rsvpController = require('./controllers/rsvpController');

const router = express.Router();

router.get('/', rsvpController.home);
router.get('/respond', rsvpController.redirectHome);
router.post('/respond', rsvpController.saveResponse);
router.get('/thank-you', rsvpController.thankYou);

module.exports = router;
