const User= require('../models/User');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

exports.authenticateUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      console.log('No user');
      return res.status(400).send('Cannot find user');
    }
    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign({ userId: user._id }, 'imSecret');
      console.log("cookie sa accounts: ", token);
      res.status(200).json({ success: true, token });
    } else {
      res.send('Not Allowed');
    }
  } catch {
    console.log('Error on controller');
    res.status(500).send();
  }
};

exports.registerUser = async (req, res) => {
    try {
        const existingUser = await User.findOne({username: req.body.username});
        if(existingUser){
            return res.status(400).send('User Already Exists');
        }
        const user = new User({
            username: req.body.username,
            name: {
              fname: req.body.fname,
              mname: req.body.mname,
              lname: req.body.lname
            },
            email: req.body.email,
            role: 'user',
            password: req.body.password
        });
        const newUser = await user.save();

        res.status(201).json(newUser);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}
exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    res.clearCookie('session-id');
    res.json({ message: 'Successfully logged out' });
  });
};


