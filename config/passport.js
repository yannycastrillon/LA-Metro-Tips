const
  passport=require('passport'),
  localStrategy = require('passport-local').Strategy,
  User = require('../models/User.js')

// Takes logged in User object, create a session key out of it, and store that key in a cookie.
passport.serializerUser((user,done)=>{
  done(null,user.id)
})

// Reads cookie on the next request(s) and decode that into the original user object so our app knows that user is still authorized.
passport.deserializerUser((id,done)=>{
  User.findById(id,(err,user)=>{
    done(err,user)
  })
})


// Create a local strategy obj
var localStrategy = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}

// LOCAL SIGNUP
passport.use('local-signup', localStrategy, (req, email, password, done) => {
    User.findOne({'local.email': email}, (err, user) => {
        if(err) return done(err)
        if(user) return done(null, false, req.flash('signupMessage', 'That email is taken.'))
        var newUser = new User()
        newUser.local.name = req.body.name
        newUser.local.email = email
        newUser.local.password = newUser.generateHash(password)
        newUser.save((err) => {
            if(err) throw err
            return done(null, newUser, null)
        })
    })
}))

// LOCAL SIGNIN
passport.use('local-login', localStrategy, (req, email, password, done) => {
    User.findOne({'local.email': email}, (err, user) => {
        if(err) return done(err)
        if(!user) return done(null, false, req.flash('loginMessage', 'No user found...'))
        if(!user.validPassword(password)) return done(null, false, req.flash('loginMessage', 'Wrong Password.'))
        return done(null, user)
    })
}))


module.exports = passport
