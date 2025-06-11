const express = require('express');
const router = express.Router();
const {
  createProposal,
  acceptProposal,
  rejectProposal,
} = require('../controllers/proposalController');
const { protect } = require('../middleware/authMiddleware');

// Create a proposal
router.post('/', protect, createProposal);

// Accept a proposal
router.patch('/:id/accept', protect, acceptProposal);

// Reject a proposal
router.patch('/:id/reject', protect, rejectProposal);

module.exports = router;
