const
  express = require('express'),
  postRouter = express.Router(),
  Post = require('../models/Post.js')

postRouter.use(isLoggedIn)


// ALL Posts 
postRouter.route('/')
  .get((req,res)=>{
    Post.find({}, (err,posts)=>{
      res.render('posts/')
    })
  })


// post/:id
postRouter.route('/:id')
  .get((req,res)=>{

  })









function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next()
  req.flash('loginMessage', 'You must be logged in to see that.')
  res.redirect('/login')
}

module.exports = postRouter
