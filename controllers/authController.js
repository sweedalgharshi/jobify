const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnAuthenticatedError } = require("../errors/index");

// REGISTER
async function register(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  const userAlreadyExist = await User.findOne({ email });

  if (userAlreadyExist) {
    throw new BadRequestError("Email already in use");
  }
  const user = await User.create({ name, email, password });

  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
    },
    token,
    location: user.location,
  });
}

// LOGIN

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  console.log(user);

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  const token = user.createJWT();
  user.password = undefined;

  res.status(StatusCodes.OK).json({ user, token, location: user.location });
}

// UPDATE

function updateUser(req, res) {
  res.send("UPDATE USER");
}

module.exports = {
  register,
  login,
  updateUser,
};
