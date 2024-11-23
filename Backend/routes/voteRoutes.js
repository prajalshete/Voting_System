const express = require('express');
const router = express.Router();
const voteController = require('../controllers/voteController');
const auth = require('../middlewares/auth');

router.post('/', auth.authenticate, voteController.castVote);

module.exports = router;
