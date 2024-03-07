require('dotenv').config();

const express = require('express');
const { initializeApp } = require("firebase/app");
const firebaseConfig = require('./dbconfig');
const app = express();
const port = 3000;
const routes = require('./routes/routes');
const firebaseApp = initializeApp(firebaseConfig);

// Serve static files from the public directory
app.use(express.static('public'));

// Define a route to serve the login.html file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

// Use the routes defined in routes/routes.js
app.use('/', routes);

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});