const User = require("../models/userModel");

exports.authMiddleware = (req, res, next) => {
  
  const session = req.session;
  
  if (!session.user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Unauthorized!'
    });
  }
  
  next();
}
