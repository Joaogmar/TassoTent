const admin = require('../config/firebaseConfig');
const bcrypt = require('bcrypt');
const fs = require('fs');

const hashPassword = async (password) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
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

const createAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const hashedPassword = await hashPassword(password);

        const newAdminRef = admin.database().ref('users').child('admins').child(username); 

        await newAdminRef.set({
            username,
            password: hashedPassword
        });

        console.log("Admin created successfully with username:", username); 

        res.status(201).json({ message: 'Admin created successfully', username });
    } catch (error) {
        console.error('Error creating admin:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { createAdmin, loginUser };
