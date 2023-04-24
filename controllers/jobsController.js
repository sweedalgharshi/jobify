// Create job
function createJob(req, res) {
  res.send("CREATE JOB");
}

// delete job
function deleteJob(req, res) {
  res.send("DELETE JOB");
}

// get all jobs
function getAllJobs(req, res) {
  res.send("GET ALL JOBS");
}

// update job
function updateJob(req, res) {
  res.send("UPDATE JOB");
}

// show stats
function showStats(req, res) {
  res.send("SHOW STATS");
}

module.exports = {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  showStats,
};
