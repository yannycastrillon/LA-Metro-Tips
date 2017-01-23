const
  express = require('express'),
  postRouter = express.Router(),
  Post = require('../models/Post.js')

postRouter.use(isLoggedIn)


// ALL Posts
postRouter.route('/posts')
  .get((req,res)=>{
      console.log("All post goes here");
      res.json({message: "All Post go Here!!!"})
  })









function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next()
  req.flash('loginMessage', 'You must be logged in to see that.')
  res.redirect('/login')
}

module.exports = postRouter
