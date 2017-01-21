// Routes

const
  express = require('express'),
  passport = require('passport'),
  request = require('request'),
  userRouter = express.Router()



// Login route
userRouter.route('/login')
  .get((req, res) =>{
    res.render('login',{message:req.flash('loginMessage')})
  })
  .post(passport.authenticate('local-login',{
    successRedirect:'/home', // Makes a new Request
    failureRedirect:'/login'

  }))



//Signup route
userRouter.route('/signup')
  .get((req, res) => res.render('signup',{message:req.flash('signupMessage')}))
  .post(passport.authenticate('local-signup',{
    successRedirect:'/home',
    failureRedirect:'/signup'
  }))

// Logout
userRouter.get('/logout', (req, res) => {
  // Destroys the session, and redirect user back to the home page
  req.logout()
  res.redirect('home')
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Method used to authorize a user BEFORE allowing them to proceed and see all posts from a bus-line
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next()
  res.redirect('/login')
}

module.exports = userRouter
