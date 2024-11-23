const mongoose = require('mongoose');

const electionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    candidates: [{ name: String, party:String, votes: { type: Number, default: 0 } }],
    startDate: { type: Date },
    endDate: { type: Date }
});

module.exports = mongoose.model('Election', electionSchema);
