const
  mongoose = require("mongoose"),
  Schema = mongoose.Schema,

  postSchema = new Schema({
    title:{type:String, require:true},
    content:{type:String,require:true},
    thumbsUp:{type:Number},
    bus_id:{type:Number},
    _author:{type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  }, {timestamps: true})

  postSchema.pre('findOne', function() {
    this.populate('_author')
  })

module.exports = mongoose.model("Post", postSchema)

//Post.create(Object.assign({}, req.body, {bus_id: req.params.id, _author: req.user}))
