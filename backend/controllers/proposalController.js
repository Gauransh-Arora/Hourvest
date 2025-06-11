const Proposal = require('../models/Proposal');
const User = require('../models/User');

// @desc    Create a new proposal
// @route   POST /api/proposals
// @access  Private
const createProposal = async (req, res) => {
  try {
    const { receiverId, taskDescription, coins } = req.body;
    const senderId = req.user.id;

    if (!receiverId || !taskDescription || !coins) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const proposal = await Proposal.create({
      sender: senderId,
      receiver: receiverId,
      taskDescription,
      coins,
    });

    res.status(201).json(proposal);
  } catch (err) {
    console.error('Error creating proposal:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Accept a proposal
// @route   PATCH /api/proposals/:id/accept
// @access  Private
const acceptProposal = async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id);

    if (!proposal) {
      return res.status(404).json({ message: 'Proposal not found' });
    }

    if (proposal.receiver.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to accept this proposal' });
    }
 // Fetch sender and receiver
    const sender = await User.findById(proposal.sender);
    const receiver = await User.findById(proposal.receiver);

    if (!sender || !receiver) {
      return res.status(404).json({ message: 'Sender or Receiver not found' });
    }

    // Check if sender has enough minits
    if (sender.minits < proposal.coins) {
      return res.status(400).json({ message: 'Sender does not have enough minits' });
    }

    // Transfer minits
    sender.minits -= proposal.coins;
    receiver.minits += proposal.coins;

    // Update proposal status
    proposal.status = 'accepted';

    // Save all changes
    await sender.save();
    await receiver.save();
    await proposal.save();

    res.status(200).json({ message: 'Proposal accepted and minits transferred', proposal });
  } catch (err) {
    console.error('Error accepting proposal:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Reject a proposal
// @route   PATCH /api/proposals/:id/reject
// @access  Private
const rejectProposal = async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id);

    if (!proposal) {
      return res.status(404).json({ message: 'Proposal not found' });
    }

    if (proposal.receiver.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to reject this proposal' });
    }

    proposal.status = 'rejected';
    await proposal.save();

    res.status(200).json(proposal);
  } catch (err) {
    console.error('Error rejecting proposal:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Export
module.exports = {
  createProposal,
  acceptProposal,
  rejectProposal,
};
