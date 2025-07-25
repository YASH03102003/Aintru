const express = require('express');
const router = express.Router();

// GET /api/dashboard/data - Get all dashboard data for the user
router.get('/data', async (req, res) => {
  // TODO: Aggregate user data (interviews, resumes, analytics, suggestions)
  res.json({ dashboard: {} });
});

module.exports = router; 