const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');


// The `/api/comments` 
router.get('/', (req, res) => {
    // find all comments
  Comment.findAll()
  .then(dbCommentData => res.json(dbCommentData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', withAuth, (req, res) => {
  //create a new comments
  Comment.create({
    comment_text: req.body.comment_text,      
    post_id: req.body.post_id,
    user_id: req.session.user_id
  })
  .then(dbCommentData => {
    // console.log('IAMABANAA', dbCommentData)
    res.json(dbCommentData)
  })
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.put('/:id', withAuth, (req, res) => {
    // update a comments
    Comment.update({
        comment_text: req.body.comment_text
    }, {
        where: {
            id: req.params.id
        }
    }).then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: "No comment found with this id" });
            return;
        }
        res.json(dbCommentData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
    // delete comments
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCommentData => {
      if (!dbCommentData) {
        res.status(404).json({ message: "No comment found with this id" });
        return;
      }
      res.json(dbCommentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;