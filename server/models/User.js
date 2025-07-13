const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  role: { type: String, default: 'member' }
});

module.exports = mongoose.model('User', userSchema);


// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password_hash: String,
//   role: { type: String, default: 'member' }
// });

// module.exports = mongoose.model('User', userSchema);
