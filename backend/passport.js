const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // ✅ Adjust path if needed
require('dotenv').config(); // Just in case

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://hourvest.onrender.com/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        // Check if user exists
        let existingUser = await User.findOne({ googleId: profile.id });

        if (!existingUser) {

            
          if (!existingUser) {
            // Generate a random username
            const baseName = profile.displayName.replace(/\s+/g, '').toLowerCase();
            const randomNum = Math.floor(Math.random() * 10000);
            const username = `${baseName}${randomNum}`; 


          // If not, create one
          existingUser = new User({
            googleId: profile.id,
            email: profile.emails[0].value,
             username: username,
             minits: 60, // Default value
          });
          await existingUser.save();
        }else {
            // If user exists with same email but not googleId, link it
            existingUser.googleId = profile.id;
            await existingUser.save();
          }
        }

        // Create JWT token
        const payload = {
          id: existingUser._id,
          username: existingUser.username,
          email: existingUser.email,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: '1d',
        });

        return done(null, { ...payload, token });
      } catch (err) {
        console.error('❌ Error in GoogleStrategy:', err);
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
