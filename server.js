const express = require("express");
const mongoose = require("mongoose");


const app = express();
const PORT = process.env.PORT || 3001;

const http = require('http').Server(app);
const io = require('socket.io')(http);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/test1' , { useNewUrlParser: true });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

require('./routes/api-routes')(app, io, http);

app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});