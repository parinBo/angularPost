const mongoose = require("mongoose");
const uniqueValid = require('mongoose-unique-validator')
const user = mongoose.Schema({
  email:{type:String,require:true,unique:true},
  password:{type:String,require:true}
});

user.plugin(uniqueValid)
module.exports = mongoose.model("User", user);
