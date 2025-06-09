const express = require('express');
const router = express.Router();

const { postTask, getAllTasks, searchTasks } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware'); // Auth middleware to protect routes

// Create a task - protected
router.post('/', protect, postTask);

// Get all tasks for homepage
router.get('/',getAllTasks);

// Search/filter tasks
router.get('/search', searchTasks);

router.get('/test', (req, res) => {
  res.send("🔥 Task test route hit");
});


module.exports = router;
