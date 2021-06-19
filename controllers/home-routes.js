const router = require("express").Router();
const { Commenst, Post, User } = require("../models");

//newpost
router.get("/newpost", (req, res) => {
  res.render("create-post");
});

//dashboard
router.get("/dashboard", (req, res) => {
  // res.render('dashboard');

  Post.findAll({
    where: {
      id: req.session.user_id,
    },

    include: [User],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      console.log(posts);
      res.render("dashboard", { posts });
    })
    .catch((err) => {
      res.json(err);
    });
});

//home
router.get("/home", (req, res) => {
  Post.findAll({
    include: [User],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      console.log(posts);
      res.render("homepage", { posts });
    })
    .catch((err) => {
      res.json(err);
    });
});
 ////??????
router.get("/edit-post/:id", (req, res) => {
  console.log("test")
  Post.findOne({
    where: {
      id: req.params.id,
    },
    include: [User],
  })
    .then((dbPostData) => {
      const post = dbPostData.get({ plain: true });
      console.log(post);
      res.render("edit-post", { post });
    })
    .catch((err) => {
      console.log(err)
      res.json(err);
    });
});

// Login route
router.get("/", (req, res) => {
  // res.json('test')
  //  If the user is already logged in, redirect to the homepage
  //   if (req.session.loggedIn) {
  //     res.redirect('/home');
  //     return;
  //   }
  res.render("login");
});

//Redirect to sign up page
router.get("/sign-up", (req, res) => {
  res.render("signup");
});

router.get("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.redirect("/");
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
