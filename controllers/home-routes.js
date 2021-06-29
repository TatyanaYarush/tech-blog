const router = require("express").Router();
const { Comment, Post, User } = require("../models");

//newpost
router.get("/newpost", (req, res) => {
  res.render("create-post");
});

//dashboard
router.get("/dashboard", (req, res) => {
  // res.render('dashboard');
console.log("dashboard", req.session)
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },

    include: [
      User,
      {
        model: Comment,
        include: [User],
      },
    ],
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
    include: [
      User,
      {
        model: Comment,
        include: [User],
      },
    ],
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
 ////single post
router.get("/single-post/:id", (req, res) => {
  console.log("test")
  Post.findByPk(req.params.id, {
    include: [
      User,
      {
        model: Comment,
        include: [User],
      },
    ],
  })
    .then((dbPostData) => {
      const post = dbPostData.get({ plain: true });
      console.log("rendering post", post);
      res.render("single-post", { loggedIn: req.session.loggedIn, post });
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});



// Login route
router.get("/", (req, res) => {
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
