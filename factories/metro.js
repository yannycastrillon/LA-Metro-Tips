const
  request = require('request'),
  Post = require('../models/Post.js'),
  metroLinesUrl = 'https://api.metro.net/agencies/lametro/routes/',
  // Runs of the metro bus-routes from East, West, Noth, South
  metroLineRuns = "https://api.metro.net/agencies/lametro/routes/720/runs/",
  // Brings the stops of the bus-id
  metroLineStop = "https://api.metro.net/agencies/lametro/routes/720/stops/"

module.exports = {
  getMetroRoutes,
  getMetroRoute,
  getAssociatedPosts,
  getMetroRuns
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

// Promise to get all the runs made by a bus
function getMetroRuns(id, incomingData){
  return new Promise((resolve, reject)=>{
    request.get(metroLinesUrl+id+"/runs", (err,response,body)=>{
      if(err){reject(err)}
      else{
        var runs = JSON.parse(body).items
        console.log(JSON.parse(body));
        resolve(Object.assign({}, incomingData, {runs}))
      }
    })
  })
}

// Promise get a single Metro route
function getMetroRoute(id) {
  return new Promise((resolve, reject) => {
    request.get(metroLinesUrl + id, (err, response, body) => {
      if(err) { reject(err) }
      else {
        var route = JSON.parse(body)
        resolve({route})
      }
    })
  })
}

// Promise get an Associate Post to that route
function getAssociatedPosts(id, incomingData) {
  return new Promise((resolve, reject) => {
    Post.find({bus_id: id}, (err, posts) => {
      if(err) { reject(err) }
      else { resolve(Object.assign({}, incomingData, {posts})) }
    })
  })
}
