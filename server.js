const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

let idCount = 3;

const database = {
    users: [{
            id: '1',
            name: 'Lewis',
            email: 'lewis@email.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '2',
            name: 'Carl',
            email: 'carl@email.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ]
};

/**
 * Returns all users
 */
app.get('/', (req, res) => {
    res.json(database.users);
});


/**
 *  Body: application/json
 * {
 *    email: String,
 *    password: String
 * }
 */
app.post('/signin', (req, res) => {
    if (req.body.email == database.users[0].email && req.body.password == database.users[0].password) {
        res.json('success');
    } else {
        res.status(400).json('Error logging in');
    }
});

/**
 * Get profile for user
 * Ex: /profile/1
 */
app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    });
    if (!found) {
        res.status(404).json('Not found');
    }
});

/**
 *  Body: application/json
 * {
 *    name: String,
 *    email: String,
 *    password: String
 * }
 */
app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    database.users.push({
        id: String(idCount++),
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    });
    if (email.length === 0 || password.length === 0 || name.length === 0) {
        res.status(400).json("Incomplete register information");
    }
    res.json(database.users[database.users.length - 1]);
});

app.listen(3000, () => {
    console.log('Running');
});