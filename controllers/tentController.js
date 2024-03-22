const admin = require('../config/firebaseConfig');
const fs = require('fs');

// Controller function for creating a new tent
async function createTent(req, res) {
  try {
    console.log('Creating a new tent...');

    const tentRef = admin.database().ref('tents');

    // Fetch current tent list using a transaction for consistency
    await tentRef.once('value', async (snapshot) => {
      const currentTentList = snapshot.val();
      let nextTentId = 0;

      if (currentTentList) {
        // Find the highest existing tent ID
        const lastTentKey = Object.keys(currentTentList).sort().pop();
        nextTentId = parseInt(lastTentKey.slice(4)) + 1; // Extract the number from the key
      }

      const newTentName = `tent${nextTentId}`;
      const newTentRef = tentRef.child(newTentName);

      const tentData = {
        username: newTentName,
        password: newTentName, // Using the same name for simplicity (use a secure method in production)
      };

      await newTentRef.set(tentData);

      console.log('Tent created successfully with name:', newTentName);
      res.status(201).json({ message: 'Tent created successfully' });
    });
  } catch (error) {
    console.error('Error creating tent:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  createTent
};