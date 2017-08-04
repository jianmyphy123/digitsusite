const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// User Schema
const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  timezone: {
    type: String
  }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = (id, callback) => {
  User.findById(id, callback);
}

module.exports.getUserByUsername = (username, callback) => {
  const query = { username: username };
  User.findOne(query, callback);
}

module.exports.addUser = (newUser, callback) => {

  const password_digest = bcrypt.hashSync(newUser.password, 10);
  newUser.password = password_digest;
  newUser.save(callback);

}
