// REGISTER
function register(req, res) {
  res.send("REGISTER");
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
