const mongoose = require('mongoose');
const Canvas = require("../models/Canvas");

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/test1' , { useNewUrlParser: true }).then(() => {
    console.log('connected to db');
})

Canvas.findOneAndUpdate( { name : "Test1" }, { pixels : {} }).then(response => {
    console.log(response);
}).catch(err => {
    console.log(err);
}).finally(() => {
    mongoose.connection.close();
})