const
  express = require('express'),
  userRouter = express.Router()

  userRouter.route('/home')
    .get((req, res) =>  {
      res.render('home')
    })

userRouter.route('/login')
  .get((req, res) =>{
    console.log("Login routee");
    // res.json({message:'login'})
    res.render('login')
  })

userRouter.route('/signup')
  .get((req, res) =>  {
    res.render('signup')
  })

// userRouter.get('/profile', isLoggedIn, (req, res) => {
//   //
// })

userRouter.route('/logout', (req, res) => {
  //
})

//middleware
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next()
  res.redirect('/login')
}

module.exports = userRouter
