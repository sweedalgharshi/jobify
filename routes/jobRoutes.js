const express = require('express');
const {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  showStats,
} = require('../controllers/jobsController');
const testUser = require('../middleware/testUser');

const router = express.Router();

router.route('/').post(testUser, createJob).get(getAllJobs);

router.route('/stats').get(showStats);

router
  .route('/:id')
  .delete(testUser, deleteJob)
  .patch(testUser, updateJob);

module.exports = router;
