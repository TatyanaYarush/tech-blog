const { User } = require('../models');

const userData = [{
        username: 'tTanya',
        password: 'jkohn123password?!',
        email: "tanya_y@gmail.com"
    },
    {
        username: 'marta',
        password: '765marta%%',
        email: "tmarta@gmail.com"
    },
    {
        username: 'lola',
        password: 'lola964335!?%',
        email: "lola@gmail.com"
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;