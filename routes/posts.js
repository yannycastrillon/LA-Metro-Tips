const
  express = require('express'),
  postRouter = express.Router(),
  Post = require('../models/Post.js')

postRouter.use(isLoggedIn)


// ALL Posts
postRouter.route('/') // 'route/:id/posts'
  .get((req,res)=>{
    Post.find({bus_id: req.query.bus_id},(err,posts)=>{
      res.json(posts)
    })
  })
  .post((req,res)=>{
    console.log("new Post here");
    var newPost = new Post(req.body)
    newPost._author = req.user
    newPost.save((err,post)=>{
      console.log("User save with posts");
      req.user.posts.push(post)
      req.user.save()
      res.redirect("/routes/"+req.body.bus_id)
    })
  })









function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next()
  req.flash('loginMessage', 'You must be logged in to see that.')
  res.redirect('/login')
}

module.exports = postRouter
