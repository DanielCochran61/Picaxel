const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// define the User model schema
var UserSchema = new mongoose.Schema({
  username: {trim: true, type: String, index: {unique: true}, required: "Username is required"},
  password: {type: String, required: true},
  canplace: Boolean
});


/**
 * Compare the passed password with the value in the database. A model method.
 *
 * @param {string} password
 * @returns {object} callback
 */
UserSchema.methods.comparePassword = function comparePassword(password) {
  return bcrypt.compareSync(password, this.password);
};



UserSchema.pre('save', function saveHook(next) {
  const user = this;

  // proceed further only if the password is modified or the user is new
  if (!user.isModified('password')) return next();

  user.password = bcrypt.hashSync(user.password, parseInt(process.env.SALT))

  return next();

});


module.exports = mongoose.model('User', UserSchema);

