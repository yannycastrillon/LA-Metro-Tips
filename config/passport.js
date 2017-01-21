const
  passport=require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  User = require('../models/User.js')

// Takes logged in User object, create a session key out of it, and store that key in a cookie.
passport.serializeUser((user,done)=>{
  done(null,user.id)
})

// Reads cookie on the next request(s) and decode that into the original user object so our app knows that user is still authorized.
passport.deserializeUser((id,done)=>{
  User.findById(id,(err,user)=>{
    done(err,user)
  })
})

// LOCAL SIGNUP
passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({'email': email}, (err, user) => {
        if(err) return done(err)
        if(user) return done(null, false, req.flash('signupMessage', 'Email already exist!'))
        var newUser = new User()
         newUser.firstName = req.body.firstName
         newUser.lastName = req.body.lastName
        newUser.email = email
        newUser.password = newUser.generateHash(password)
        newUser.save((err) => {
            if(err) throw err
            return done(null, newUser, null)
        })
    })
}))

// LOCAL SIGNIN
passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({'email': email}, (err, user) => {
        if(err) {console.log("error"); return done(err)}
        if(!user) {console.log("No User Found"); return done(null, false, req.flash('loginMessage', 'No user found...'))}
        if(!user.validPassword(password)) {console.log("email or password fail"); return done(null, false, req.flash('loginMessage', 'email or password not valid'))}
        return done(null, user)
    })
}))

module.exports = passport
