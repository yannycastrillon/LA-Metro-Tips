const
  mongoose = require("mongoose"),
  bcrypt = require("bcrypt-nodejs"),
  Schema = mongoose.Schema,

  // Build up the schema of the model
  userSchema = new Schema({
    firstName:{type:String, require:true},
    lastName:{type:String,require:true},
    email:{type:String, require:true, index:{unique:true}},
    // password will be encrypted as password_digest on DB with bycrypt-nodejs
    password:{type:String,require:true},
    posts: [{type:mongoose.Schema.Types.ObjectId, ref:"Post"}]
  })

userSchema.pre("findOne", function () {
  this.populate("posts")
})

// Creates a hash with a SALT encrypted password using bcrypt
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password,bcrypt.genSaltSync(10))
}

// Validates the password with the one encrypted on DB.
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password,this.password)
}


// exports model so it can be used on other parts of the app
module.exports = mongoose.model("User",userSchema)
