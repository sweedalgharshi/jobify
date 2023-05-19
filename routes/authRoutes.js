const express = require('express');
const rateLimiter = require('express-rate-limit');
const testUser = require('../middleware/testUser');

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message:
    'Too many requests from this IP, please try again after 15 minutes',
});

const router = express.Router();

const {
  register,
  login,
  updateUser,
} = require('../controllers/authController');

const authenticateUser = require('../middleware/auth');

router.route('/register').post(apiLimiter, register);
router.route('/login').post(apiLimiter, login);
router
  .route('/updateUser')
  .patch(authenticateUser, testUser, updateUser);

module.exports = router;
