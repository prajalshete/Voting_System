const express = require('express');
const router = express.Router();
const electionController = require('../controllers/electionController');
const auth = require('../middlewares/auth');

router.post('/create', auth.authenticate, auth.admin, electionController.createElection);
router.get('/',auth.authenticate, electionController.getAllElections);
router.get('/:id',auth.authenticate, electionController.getElectionById);
router.delete('/delete/:id', auth.authenticate, auth.admin, electionController.deleteElection);

module.exports = router;
