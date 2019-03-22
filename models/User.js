const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Create a new Person schema
 */
var UserSchema = new Schema({
  username: {trim: true, type: String, index: {unique: true}, required: "Username is required"},
  password: {type: String, required: true},
  canplace: Boolean
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
