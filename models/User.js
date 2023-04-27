const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },

  email: {
    type: String,
    required: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },

  lastName: {
    type: String,
    trim: true,
    maxlength: 20,
    default: "lastName",
  },

  location: {
    type: String,
    trim: true,
    maxlength: 20,
    default: "Mumbai IN",
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", UserSchema);
