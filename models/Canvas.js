const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Block = new mongoose.Schema({
  x: Number,
  y: Number,
  color: String
});

const Block = mongoose.model("Block", BlockSchema);

module.exports = Block;