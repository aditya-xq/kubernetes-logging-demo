const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Simulated database
const users = {
    "john_doe": { password: "12345", balance: 100 },
    "jane_doe": { password: "67890", balance: 200 }
};

// Helper function for logging
const log = (level, message) => {
    const timestamp = new Date().toLocaleString();
    console.log(`${timestamp} - ${level} - ${message}`);
};  

// Middleware to log requests
app.use((req, res, next) => {
    log('info', `Request received: ${req.method} ${req.originalUrl}`);
    next();
});

// Endpoint for user authentication
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (users[username] && users[username].password === password) {
        log('info', `User login successful: ${username}`);
        res.status(200).send('Login successful');
    } else {
        log('warn', `User login failed: ${username}`);
        res.status(401).send('Login failed');
    }
});

// Endpoint for logging user transactions
app.post('/transaction', (req, res) => {
    const { username, amount } = req.body;
    if (users[username]) {
        users[username].balance += amount;
        log('info', `Transaction successful: ${username} new balance: ${users[username].balance}`);
        res.status(200).send('Transaction successful');
    } else {
        log('warn', `Transaction failed: User not found - ${username}`);
        res.status(404).send('User not found');
    }
});

// Endpoint for simulating payment processing
app.post('/payment', (req, res) => {
    const { username, amount } = req.body;
    if (users[username]) {
        if (users[username].balance >= amount) {
            users[username].balance -= amount;
            log('info', `Payment successful: ${username} amount: ${amount}`);
            res.status(200).send('Payment successful');
        } else {
            log('warn', `Payment failed: Insufficient funds - ${username}`);
            res.status(400).send('Insufficient funds');
        }
    } else {
        log('warn', `Payment failed: User not found - ${username}`);
        res.status(404).send('User not found');
    }
});

// Endpoint for simulating security incident
app.post('/admin', (req, res) => {
    const { username } = req.body;
    if (username === 'admin') {
        log('error', `Unauthorized access attempt by user: ${username}`);
        res.status(403).send('Unauthorized access');
    } else {
        res.status(200).send('Welcome');
    }
});

app.listen(port, () => {
    log('info', `Dummy microservice listening at http://localhost:${port}`);
});
