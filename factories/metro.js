const
  request = require('request'),
  Post = require('../models/Post.js'),
  metroLinesUrl = 'http://api.metro.net/agencies/lametro/routes/'

module.exports = {
  getMetroRoutes,
  getMetroRoute,
  getAssociatedPosts
}

// Promise getMetroRoutes
function getMetroRoutes() {
  return new Promise((resolve, reject) => {
    request.get(metroLinesUrl, (err, response, body) => {
      if(err) { reject(err) }
      else {
        var routes = JSON.parse(body).items
        resolve(routes)
      }
    })
  })
}

function getMetroRoute(id) {
  return new Promise((resolve, reject) => {
    request.get(metroLinesUrl + id, (err, response, body) => {
      if(err) { reject(err) }
      else {
        var route = JSON.parse(body)
        resolve(route)
      }
    })
  })
}

function getAssociatedPosts(route) {
  return new Promise((resolve, reject) => {
    Post.find({bus_id: route.id}, (err, posts) => {
      if(err) { reject(err) }
      else { resolve({route, posts}) }
    })
  })
}
