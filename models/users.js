/**
*Module dependencies
*/
var
  mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs');
//==============================================================================
/**
*Module Variables
*/
//==============================================================================
/**
*Create User Schema
*/
var UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  },
  created_on: {
    type: Date,
    default: Date.now
  }
});
//==============================================================================
/**
*Schema methods
*/
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};
//==============================================================================
/**
*Create User Model
*/
var UserModel = mongoose.model('User', UserSchema);
//==============================================================================
/**
*Export Module
*/
module.exports = UserModel;
//==============================================================================
