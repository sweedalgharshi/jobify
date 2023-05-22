const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const {
  BadRequestError,
  UnAuthenticatedError,
} = require('../errors/index');
const attachCookie = require('../utils/attachCookies');

// REGISTER
async function register(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError('Please provide all values');
  }

  const userAlreadyExist = await User.findOne({ email });

  if (userAlreadyExist) {
    throw new BadRequestError('Email already in use');
  }
  const user = await User.create({ name, email, password });

  const token = user.createJWT();

  // Cookies
  attachCookie({ res, token });

  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
    },
    location: user.location,
  });
}

// LOGIN

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide all values');
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new UnAuthenticatedError('Invalid Credentials');
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError('Invalid Credentials');
  }

  const token = user.createJWT();
  user.password = undefined;

  attachCookie({ res, token });

  res.status(StatusCodes.OK).json({ user, location: user.location });
}

// UPDATE

async function updateUser(req, res) {
  const { email, name, lastName, location } = req.body;

  if (!email || !name || !lastName || !location) {
    throw new BadRequestError('Please provide all values');
  }

  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;

  await user.save();

  const token = user.createJWT();

  attachCookie({ res, token });

  res.status(StatusCodes.OK).json({
    user,
    location: user.location,
  });
}

async function getCurrentUser(req, res) {
  const user = await User.findOne({ _id: req.user.userId });

  res.status(StatusCodes.OK).json({ user, location: user.location });
}

async function logout(req, res) {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });

  res.status(StatusCodes.OK).json({ msg: 'User Logged Out' });
}

module.exports = {
  register,
  login,
  updateUser,
  getCurrentUser,
  logout,
};
