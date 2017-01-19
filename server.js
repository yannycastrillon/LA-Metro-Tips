const
  express = require("express"),
  app = express(),
  ejs = require('ejs'),
  ejsLayouts = require('express-ejs-layouts'),
  mongoose = require('mongoose'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  flash = require('connect-flash'),
  passport = require('passport'),
  session = require('express-session'),

  userRoutes = require('./routes/users.js'),
  passportConfig = require('./config/passport.js')


  PORT = 3000

// Connection to mongodb
mongoose.connect("mongodb://localhost:la-metro-tips", (err)=>{
  console.log(err || "Connected to mongodb (la-metro-tips)");
})

// middleware
app.use(logger('dev'))
app.use(flash())



//ejs config
app.set('view engine', 'ejs')
app.use(ejsLayouts)
// session + passport
app.use(session({
    secret: "la-metro-tips-secret",
    cookie:{maxAge : 60000000},
    resave: true,
    saveUninitialized: false,
    store: store
}))
app.use(passport.initialize())
app.use(passport.session())

// Make available the current user to all the views
app.use((req, res, next) => {
    app.locals.currentUser = req.user // currentUser now available in ALL views
    app.locals.loggedIn = !!req.user // a boolean loggedIn now available in ALL views
    next()
})


// root route
app.get('/', (req, res) => {
  res.json({message: "This is the root route..."})
})

app.use('/',userRoutes)


// server listening
app.listen(PORT, (err)=>{
  console.log(err || "Server is running in port:"+PORT);
})
