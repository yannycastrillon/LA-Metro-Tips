const
  express = require("express"),
  app = express(),
  ejs = require('ejs'),
  ejsLayouts = require('express-ejs-layouts'),
  mongoose = require('mongoose'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  flash = require('connect-flash'),
  cookieParser = require('cookie-parser'),
  passport = require('passport'),
  session = require('express-session'),
  MongoDBStore = require('connect-mongodb-session')(session),

  userRoutes = require('./routes/users.js'),
  passportConfig = require('./config/passport.js'),
  metro = require('./factories/metro.js'),
  postRoutes = require('./routes/posts.js'),


  // Connection configuration.
  PORT = process.env.PORT || 3000,
  mongoConnectionString = process.env.MONGODB_URL || 'mongodb://localhost/la-metro-tips'

// Connection to mongodb
mongoose.connect(mongoConnectionString, (err)=>{
  console.log(err || "Connected to mongodb (la-metro-tips)");
})

// middleware
app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(flash())

// Store session information as a 'sessions' collection in Mongo
const
  store = new MongoDBStore({
  uri: mongoConnectionString,
  collection: 'sessions'
});


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
  // res.json({message: "This is the root route..."})
  metro.getMetroRoutes()
    .then((routes) => {
      res.render('home', {routes})
    })
})

app.get('/routes/:id', (req, res) => {
  metro.getMetroRoute(req.params.id)
    .then((route) => req.user ? getAssociatedPosts(route) : route)
    .then((data) => { res.json(data) })
    .catch((err) => console.log(err))
})


app.use('/',userRoutes)
app.use('/posts',postRoutes)

// server listening
app.listen(PORT, (err)=>{
  console.log(err || "Server is running in port:"+PORT);
})
