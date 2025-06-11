const mongoose = require('mongoose');

const ProposalSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    taskDescription: {
      type: String,
      required: true,
    },
    coins: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'reported'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Proposal', ProposalSchema);
