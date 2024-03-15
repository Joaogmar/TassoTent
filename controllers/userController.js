const admin = require('../config/firebaseConfig');
const bcrypt = require('bcrypt');
const fs = require('fs');

// Hash a password securely using bcrypt
const hashPassword = async (password) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
};

const createUser = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        if (!username || !password || !role) {
            return res.status(400).json({ error: 'Username, password, role, and createdAt are required' });
        }

        const hashedPassword = await hashPassword(password);

        // Set user data with username as the key
        const newUserRef = admin.database().ref('users').child(username); // Using username as the key
        const createdAt = req.body.createdAt || Date.now();

        await newUserRef.set({
            username,
            password: hashedPassword,
            role,
            createdAt
        });

        console.log("User created successfully with username:", username); // Log successful creation with username

        res.status(201).json({ message: 'User created successfully', username });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const loginUser = async (req, res) => {
    console.log('Login route reached');
    console.log('Request payload:', req.body); // Log request payload
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ status: 'error', message: 'Username and password are required' });
        }

        // Retrieve user data by username from Realtime Database
        const userRef = admin.database().ref(`users/${username}`);
        const userSnapshot = await userRef.once('value');

        if (!userSnapshot.exists()) {
            return res.status(401).json({ status: 'error', message: 'Invalid username or password' });
        }

        const userData = userSnapshot.val();

        // Verify password hash using bcrypt
        const hashedPassword = userData.password;

        let passwordMatch;
        try {
            passwordMatch = await bcrypt.compare(password, hashedPassword);
        } catch (error) {
            console.error('Error comparing passwords:', error);
            throw error;
        }

        if (passwordMatch) {
            const role = userData.role;
            return res.status(200).json({ status: 'success', role });
        } else {
            return res.status(401).json({ status: 'error', message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

module.exports = { createUser, loginUser };
