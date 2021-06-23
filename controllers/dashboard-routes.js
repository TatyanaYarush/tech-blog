const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// get all posts
router.get('/', withAuth, (req, res) => {
  console.log("session:", req.session)
  Post.findAll({
    where: {
      user_id: req.session.user_id
    },
    
  })
  .then(dbPostData => {
      console.log(dbPostData)
    //serialize the data before passing to the template
    const posts = dbPostData.map(post => post.get({ plain: true }));
    console.log(posts);
    res.render('dashboard', { posts, loggedIn: true });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//get a single post
router.get('/edit/:id', withAuth, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'title', 'content', 'created_at'],
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      //serialize the data
      const post = dbPostData.get({ plain: true });
      // pass to the template
      res.render('edit-post', {
        post,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/new', (req, res) => {
  res.render('new-post');
});


module.exports = router;