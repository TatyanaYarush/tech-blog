const { Post } = require('../models');

const postData = [{
        title: 'Test Title',
        content: 'Test description.',
        user_id: 1

    },
    {
        title: 'CMS-style blog site',
        content: 'I am presented with the homepage, which includes existing blog posts if any have been posted.',
        user_id: 2
    },
    {
        title: 'Click on the homepage option',
        content: 'I am taken to the homepage.',
        user_id: 3
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;