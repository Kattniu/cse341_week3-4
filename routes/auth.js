const express = require('express');
const passport = require('passport');

const router = express.Router();

// 👉 Ruta para iniciar sesión con GitHub
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// 👉 Ruta de callback (GitHub redirige aquí después de iniciar sesión)
router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/auth/github/failure',
    successRedirect: '/auth/github/success',
  })
);

// 👉 Ruta si falla la autenticación
router.get('/github/failure', (req, res) => {
  res.status(401).json({ message: 'GitHub authentication failed' });
});

// 👉 Ruta si tiene éxito la autenticación
router.get('/github/success', (req, res) => {
  res.status(200).json({
    message: 'Successfully logged in with GitHub',
    user: req.user,
  });
});

// 👉 Ruta para cerrar sesión
router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.json({ message:'Successfully logged out'});
  });
});


// 👉 Ruta para verificar si el usuario está autenticado
router.get('/check', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ loggedIn: true, user: req.user });
  } else {
    res.json({ loggedIn: false });
  }
});

module.exports = router;
