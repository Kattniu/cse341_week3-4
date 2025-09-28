// middleware/isAuthenticated.js
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'No estás autenticado para acceder a esta ruta' });
}

module.exports = isAuthenticated;
