const User = require("../models/User");
const { StatusCode } = require("http-status-codes");
// REGISTER
async function register(req, res) {
  const user = await User.create(req.body);
  res.status(StatusCode.CREATED).json({ user });
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
