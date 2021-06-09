const router = require('express').Router();
const { Commenst, Post, User } = require('../models');

// Login route
router.get('/', (req, res) => {
     // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/home');
    return;
  }
  res.render('login');
});

//Redirect to sign up page
router.get('/sign-up', (req, res)=> {
    res.render('signup')
  });
  
  router.get('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.redirect('/');
      });
    } else {
      res.status(404).end();
    }
  });

module.exports = router;