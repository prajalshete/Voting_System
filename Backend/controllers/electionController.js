const Election = require('../models/electionModel');
const Vote = require('../models/voteModel');

exports.createElection = async (req, res) => {
    try {
        const { title, description, candidates, startDate, endDate } = req.body;
        const election = new Election({ title, description, candidates, startDate, endDate });
        await election.save();
        res.status(201).json(election);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAllElections = async (req, res) => {
    try {
        const elections = await Election.find();
        res.json(elections);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getElectionById = async (req, res) => {
    try {
        const election = await Election.findById(req.params.id);
        if (!election) return res.status(404).json({ message: 'Election not found' });

        res.json(election);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


exports.deleteElection = async (req, res) => {
    try {
        const electionId = req.params.id; // Get election ID from the request params

        // Find and delete the election by ID
        const deletedElection = await Election.findByIdAndDelete(electionId);

        // If no election is found with the given ID, return a 404 error
        if (!deletedElection) {
            return res.status(404).json({ message: 'Election not found' });
        }

        // Return a success message and the deleted election
        res.status(200).json({ message: 'Election deleted successfully', deletedElection });
    } catch (error) {
        console.error(error); // Log the error to the console
        // Handle any server errors
        res.status(500).json({ message: 'Server error' });
    }
};

