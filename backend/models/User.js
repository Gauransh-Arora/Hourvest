// models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true,
    sparse: true, // Important for optional fields
  },
  username: {
    type: String,
    required: function () {
      return !this.googleId;
    },
    unique: true,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId;
    },
    minlength: 6,
  },
  minits: {
    type: Number,
    default: 60,
  },
}, { timestamps: true });

// Hash password before saving (skip if Google user)
userSchema.pre('save', async function(next) {
  if (!this.isModified('password') || this.googleId) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
