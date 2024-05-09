const admin = require('../config/firebaseConfig');
const bcrypt = require('bcrypt');
const fs = require('fs');

const hashPassword = async (password) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
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

const adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        // Access the 'admins' node and find the admin by username
        const adminRef = admin.database().ref('users/admins').child(username);
        const snapshot = await adminRef.once('value');
        const adminData = snapshot.val();

        // Check if the admin exists
        if (!adminData) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Compare the provided password with the hashed password stored in the database
        const isPasswordMatch = await bcrypt.compare(password, adminData.password);

        if (isPasswordMatch) {
            // Passwords match, proceed with login
            req.session.user = {
                username: adminData.username,
                role: 'admin'
            };
            return res.status(200).json({ message: 'Admin login successful' });
        } else {
            // Passwords do not match
            return res.status(401).json({ error: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error during admin login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const logout = (req, res) => {
    // Destroy the session to log the user out
    req.session.destroy((err) => {
        if (err) {
            console.error('Error logging out:', err);
            return res.status(500).json({ error: 'Failed to log out' });
        }
        // Successfully logged out
        res.json({ message: 'Logged out successfully' });
    });
};

const getAdminUsername = (req, res) => {
    if (req.session.user && req.session.user.role === 'admin') {
        // Return the admin's username
        return res.json({ username: req.session.user.username });
    } else {
        // Return an error if the user is not authorized
        return res.status(403).json({ error: 'Unauthorized' });
    }
};

module.exports = {
    createAdmin,
    adminLogin,
    logout,
    getAdminUsername,
};
