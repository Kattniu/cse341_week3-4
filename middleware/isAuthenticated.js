// middleware/isAuthenticated.js
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'You are not authenticated to access this route' });
}

module.exports = isAuthenticated;
