
const express = require('express');
const router = express.Router();
const { registerUser,loginUser } = require('../controllers/authController');
const passport = require('passport');
// POST /api/auth/register
router.post('/register', registerUser);

// ✅ Login route
router.post('/login', loginUser);
// 🔐 Google Auth entry point
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// 🏁 Google Auth callback
router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://process.env.FRONTEND_URL/signup', // redirect to a failure page if needed
    session: false // optional if you’re only using JWTs
  }),
  (req, res) => {
    const token = req.user.token;
    res.redirect(`http://process.env.FRONTEND_URL/oauth-success?token=${token}`);
  }
);

  


module.exports = router;
// This file sets up the authentication routes for user registration.
