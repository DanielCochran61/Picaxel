const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var CanvasSchema = new Schema({
  name : {
    type: String,
    trim: true,
    default: "Test1"
  },
  pixels: Schema.Types.Mixed
});

const Canvas = mongoose.model("Canvas", CanvasSchema);

module.exports = Canvas;