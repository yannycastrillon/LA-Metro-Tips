const
  express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  logger = require("morgan"),
  bodyParser = require("body-parser"),

  PORT = 3000

// Connection to mongodb
mongoose.connect("mongodb://localhost:la-metro-tips", (err)=>{
  console.log(err || "Connected to mongodb (la-metro-tips)");
})


// Middleware





// server listening
app.listen(PORT, (err)=>{
  console.log(err || "Server is running in port:"+PORT);
})
