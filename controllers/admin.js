exports.isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
      next(); 
    } else {
      res.status(403).send('Access denied. You are not an admin.');
    }
  }
exports.checkUserLoggedIn = (req, res, next) => {
    if (req.session && req.session.user) {
        next();
    } else {
        res.status(400).json({message: "Empty Cart Log in First"});
    }
};

  