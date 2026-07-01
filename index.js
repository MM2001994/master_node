const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello, World! from home page');
});

app.get('/about', (req, res) => {
    const userName = req.query.user_name;
    const age = req.query.age;
    res.send(`Hi I am ${userName}, I am a software engineer and I love to code & my age is ${age}`);
});

app.get('/contacts', (req, res) => {
    res.send('This is the contacts page', contacts.txt);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});