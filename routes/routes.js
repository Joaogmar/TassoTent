require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const fs = require('fs');

// Initialize Firebase Admin SDK
try {
    const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    const serviceAccountContent = fs.readFileSync(serviceAccountPath, 'utf8');
    const serviceAccount = JSON.parse(serviceAccountContent);

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.FIREBASE_DATABASE_URL
    });
} catch (error) {
    console.error('Error initializing Firebase Admin SDK:', error);
    process.exit(1);
}

// Hash a password securely using bcrypt
const hashPassword = async (password) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
};

// Create a route to handle user creation
router.post('/users', async (req, res) => {
  try {
    console.log("Received user data:", req.body); // Log received user data

    const { username, email, password, role, createdAt } = req.body;

    if (!username || !email || !password || !role || !createdAt) {
      return res.status(400).json({ error: 'Username, email, password, role, and createdAt are required' });
    }

    const hashedPassword = await hashPassword(password);

    const newUserRef = admin.database().ref('users').push();
    const userId = newUserRef.key;

    await newUserRef.set({
      username,
      email,
      password: hashedPassword,
      role,
      createdAt,
      id: userId
    });

    console.log("User created successfully with ID:", userId); // Log successful creation with ID

    res.status(201).json({ message: 'User created successfully', userId });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
  


module.exports = router;
