// Routes

const
  express = require('express'),
  passport = require('passport'),
  userRouter = express.Router()

userRouter.route('/login')
  .get((req, res) =>{
    // res.json({message:'login'})
    res.render('login')
  })
  .post(passport.authenticate('local-login'),{
    successRedirect:'/home',
    failureRedirect:'/login'
  })


userRouter.route('/signup')
  .get((req, res) =>  {
    res.render('signup',{message:req.flash('Signup Message')})
  })
  .post(passport.authenticate('local-signup'),{
    successRedirect:'/home',
    failureRedirect:'/signup'
  })


userRouter.get('/logout', (req, res) => {
  // Destroys the session, and redirect user back to the home page
  req.logout()
  res.redirect('/')
})

// Method used to authorize a user BEFORE allowing them to proceed and see all posts from a bus-line
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next()
  res.redirect('/login')
}

module.exports = userRouter
