const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors/index');

// Create job
async function createJob(req, res) {
  const { position, company } = req.body;

  if (!position || !company) {
    throw new BadRequestError('Please Provide All Values');
  }

  req.body.createdBy = req.user.userId;

  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({ job });
}

// delete job
function deleteJob(req, res) {
  res.send('DELETE JOB');
}

// get all jobs
function getAllJobs(req, res) {
  res.send('GET ALL JOBS');
}

// update job
function updateJob(req, res) {
  res.send('UPDATE JOB');
}

// show stats
function showStats(req, res) {
  res.send('SHOW STATS');
}

module.exports = {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  showStats,
};
