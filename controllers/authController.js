const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors/index");

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
  res.status(StatusCodes.CREATED).json({ user });
}

// LOGIN

function login(req, res) {
  res.send("LOGIN");
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
