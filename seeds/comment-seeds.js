const { Comment } = require('../models');

const commentData = [{
        comment_text: "This is first comment",
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: "I like this site",
        user_id: 2,
        post_id: 2
    },
    {
        comment_text: "I don't like it",
        user_id: 3,
        post_id: 3
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;