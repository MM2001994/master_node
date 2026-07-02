const express = require('express');
const port = 3000;

const router = require('./routes/user'); // Import the user routes
const User = require('./models/user'); // Import the User model
const {connectToMongoDB} = require('./connection'); // Import the connection controller
const logRequest = require('./middlewares/index'); // Import the middleware

const app = express();

// Middleware Plugin
app.use(express.json());
app.use(logRequest('request.log'));

// Routes
app.use('/api/users' ,router); 

// Connect to MongoDB
connectToMongoDB('mongodb://127.0.0.1:27017/mydatabase');

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});