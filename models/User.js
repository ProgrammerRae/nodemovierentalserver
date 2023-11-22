const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const nameSchema = new Schema({
    fname:{
      type: String
    },
    mname:{
      type: String
    },
    lname:{
      type: String
    }
});

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name:{
    type: nameSchema,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: { 
    type: String,
    enum : ['user', 'admin'], 
    default: 'user' 
  }
});

UserSchema.pre('save', function(next) {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
