const Task = require('../models/Task');
const User = require('../models/User');

// 1. Post a task
const postTask = async (req, res) => {
  try {
    const {title, description, mediaURL, minits, keywords } = req.body;
    const userId = req.user.id; // from auth middleware

    if (!description || !minits) {
      return res.status(400).json({ message: 'Description and minits are required' });
    }

    // Create new task
    const task = new Task({
      title,
      description,
      media: Array.isArray(mediaURL) ? mediaURL : mediaURL ? [mediaURL] : [],
      minits,
      keywords,
      postedBy: userId,
    });

    await task.save();

    res.status(201).json(task);
  } catch (error) {
    console.error('Error posting task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// 2. Get all tasks (latest first)
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate('postedBy', 'username') // populate username only
      .sort({ createdAt: -1 });
    
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// 3. Search/filter tasks by keywords (field, urgency, etc)
const searchTasks = async (req, res) => {
  try {
    const { field, urgency, minMinits, maxMinits } = req.query;

    let filter = {};

    if (field) filter['keywords.field'] = field;
    if (urgency) filter['keywords.urgency'] = urgency;
    if (minMinits || maxMinits) {
      filter.minits = {};
      if (minMinits) filter.minits.$gte = Number(minMinits);
      if (maxMinits) filter.minits.$lte = Number(maxMinits);
    }

    const tasks = await Task.find(filter)
      .populate('postedBy', 'username')
      .sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error searching tasks:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  postTask,
  getAllTasks,
  searchTasks,
};
