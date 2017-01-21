const
  express = require("express"),
  app = express(),
  ejs = require('ejs'),
  ejsLayouts = require('express-ejs-layouts'),
  mongoose = require("mongoose"),
  logger = require("morgan"),
  bodyParser = require("body-parser"),
  userRoutes = require('./routes/users.js')


  PORT = 3000

// Connection to mongodb
mongoose.connect("mongodb://localhost:la-metro-tips", (err)=>{
  console.log(err || "Connected to mongodb (la-metro-tips)");
})

// middleware
app.use(logger('dev'))

// currentUser:
app.use((req, res, next) => {
	app.locals.currentUser = req.user
	app.locals.loggedIn = !!req.user

	next()
})

//ejs config
app.set('view engine', 'ejs')
app.use(ejsLayouts)

// root route
app.get('/', (req, res) => {
  res.json({message: "This is the root route..."})
})

app.use('/',userRoutes)


// server listening
app.listen(PORT, (err)=>{
  console.log(err || "Server is running in port:"+PORT);
})
