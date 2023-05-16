const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors/index');
const checkPermissions = require('../utils/checkPermissions');

const mongoose = require('mongoose');
const moment = require('moment');

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
async function deleteJob(req, res) {
  const { id: jobId } = req.params;

  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new NotFoundError(`No job with id : ${jobId}`);
  }

  checkPermissions(req.user, job.createdBy);

  await job.deleteOne();

  res.status(StatusCodes.OK).json({ msg: 'Success! Job removed' });
}

// get all jobs
async function getAllJobs(req, res) {
  const jobs = await Job.find({ createdBy: req.user.userId });

  res
    .status(StatusCodes.OK)
    .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
}

// update job
async function updateJob(req, res) {
  const { id: jobId } = req.params;

  const { company, position } = req.body;

  if (!company || !position) {
    throw new BadRequestError('Please Provide all values');
  }

  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }

  // Check permission

  checkPermissions(req.user, job.createdBy);

  const updatedJob = await Job.findOneAndUpdate(
    { _id: jobId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updatedJob });
}

// show stats
async function showStats(req, res) {
  let stats = await Job.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: { _id: '$status', count: { $sum: 1 } },
    },
  ]);

  stats = stats.reduce((acc, current) => {
    const { _id: title, count } = current;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: {
          year: {
            $year: '$createdAt',
          },
          month: {
            $month: '$createdAt',
          },
        },
        count: { $sum: 1 },
      },
    },
    {
      $sort: {
        '_id.year': -1,
        '_id.month': -1,
      },
    },
    {
      $limit: 6,
    },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      //accept 0 - 11

      const date = moment()
        .month(month - 1)
        .year(year)
        .format('MMMM Y');

      return { date, count };
    })
    .reverse();

  res
    .status(StatusCodes.OK)
    .json({ defaultStats, monthlyApplications });
}

module.exports = {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  showStats,
};
