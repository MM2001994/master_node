const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const users = require('./MOCK_DATA.json');

// Middleware to parse JSON request bodies
app.use(express.json());


// API route to get all users
app.get('/api/users', (req, res) => {
    res.json(users);
});

// API route to get,update and delete a user by ID
app.route('/api/users/:id').
get((req, res) => {
    const userId = req.params.id;
    const user = users.find(u => u.id === parseInt(userId));
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
}).
patch((req, res) => {
    const userId = req.params.id;
    const user = users.find(u => u.id === parseInt(userId));
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    const updatedUser = { ...user, ...req.body };
    const userIndex = users.indexOf(user);
    users[userIndex] = updatedUser;
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
        if (err) {
            console.error('Error writing to file', err);
            return res.status(500).json({ error: 'Failed to update user' });
        }
        res.json(updatedUser);
    });
}).
delete((req, res) => {
    const userId = req.params.id;
    const user = users.find(u => u.id === parseInt(userId));
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    const userIndex = users.indexOf(user);
    users.splice(userIndex, 1);
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
        if (err) {
            console.error('Error writing to file', err);
            return res.status(500).json({ error: 'Failed to delete user' });
        }
        res.json({ message: 'User deleted successfully' });
    });
});

// API route to create a new user
app.post('/api/users', (req, res) => {
    const newUser = req.body;
    users.push({ ...newUser, id: users.length + 1 });
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
        if (err) {
            console.error('Error writing to file', err);
            return res.status(500).json({ error: 'Failed to save user' });
        }
        res.send(`User ${newUser.first_name} ${newUser.last_name} added successfully`);
    });
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Server-side rendering route (optional)
// app.get('/users', (req, res) => {
//   res.send(`
//     <h1>Users List</h1>
//     <ul>
//       ${users.map(user => `<li>${user.first_name} ${user.last_name}</li>`).join('')}
//     </ul>
//   `);
// });