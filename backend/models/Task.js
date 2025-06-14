const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title:{
    type:String,
    required:[true,'Tilte is required for the task'],
    trim: true, // remove leading/trailing spaces
    maxlength: [100, 'Title can be max 100 characters'], // prevent absurdly long titles
  },
  description: {
    type: String,
    required: [true, 'Task description is required'],
    trim: true,
    maxlength: [1000, 'Description can be max 1000 characters'], // prevent absurdly long descriptions
  },
  media: {
    type: [String], // Array of URLs or paths to media files (images, videos, docs, etc.)
    default: [],    // Optional — no media means empty array
    validate: {
      validator: function(arr) {
        return arr.every(url => typeof url === 'string');
      },
      message: 'Media must be an array of strings (URLs or paths)',
    }
  },
  minits: {
    type: Number,
    required: [true, 'Minits amount is required'],
    min: [1, 'Minits must be at least 1'],  // no zero or negative payment, gotta keep it fair
  },
  keywords: {
    field: {
      type: String,
      required: [true, 'Field keyword is required'],
      trim: true,
      maxlength: [50, 'Field keyword too long'],
    },
    urgency: {
      type: String,
      required: [true, 'Urgency keyword is required'],
      enum: ['low', 'medium', 'high'], // restrict urgency to these levels to avoid chaos
      lowercase: true,
      trim: true,
    },
    // You can add more keywords here as per future needs, e.g.:
    // priority: { type: String, enum: ['low', 'medium', 'high'] }
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Task must be associated with a user'],
  },
}, { 
  timestamps: true // adds createdAt and updatedAt for free — useful for sorting, filtering, etc.
});

module.exports = mongoose.model('Task', taskSchema);