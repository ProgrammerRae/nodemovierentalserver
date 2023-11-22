const User = require('../models/User'); 
const session = require('express-session');

const jwt = require('jsonwebtoken');


exports.getAllUser = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10; 
    const skip = (page - 1) * limit;

    const users = await User.find({},{password:false}).skip(skip).limit(limit);
    const total = await User.countDocuments();

    res.json({
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      users: users
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.deleteUser = async (req,res) =>{
  try{
    const delUser = await User.findByIdAndDelete(req.params.id);
    if (!delUser) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json({ message: 'Movie deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User updated successfully', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.getLoggedUser = (req, res) => {
  const token = req.cookies.token;
  console.log("token:",token)
  jwt.verify(token, 'imSecret', (err, decoded) => {
    if (err) {
      res.status(401).json({ success: false, message: 'Invalid token' });
    } else {
      const userId = decoded.userId;

      User.findById(userId)
        .select('-password')
        .then(user => {
          console.log('User:', user); 
          if (!user) {
            res.json({ success: false, message: 'User not found' });
          } else {
            res.json({ success: true, user });
          }
        })
        .catch(err => {
          console.error('Error:', err);  
          res.status(500).json({ success: false, message: err.message });
        });
    }
  });
}
