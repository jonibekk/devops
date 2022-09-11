const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'User must have a @username.'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required.']
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;