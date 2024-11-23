const Election = require('../models/electionModel');
const Vote = require('../models/voteModel');

exports.castVote = async (req, res) => {
    try {
        const { electionId, candidateId } = req.body;

        const existingVote = await Vote.findOne({ voterId: req.user.id, electionId });
        if (existingVote) return res.status(400).json({ message: 'You have already voted in this election' });
  
        const vote = new Vote({ voterId: req.user.id, electionId, candidateId });
        await vote.save();

        await Election.findByIdAndUpdate(electionId, { $inc: { 'candidates.$[c].votes': 1 } }, {
            arrayFilters: [{ 'c._id': candidateId }]
        });

        res.status(201).json({ message: 'Vote cast successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
