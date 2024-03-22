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

async function deleteTent(req, res) {
  try {
    const tentRef = admin.database().ref('tents');

    // Log fetching tent list
    console.log('Fetching current tent list...');

    // Fetch current tent list using a transaction for consistency
    await tentRef.once('value', async (snapshot) => {
      const currentTentList = snapshot.val();

      if (!currentTentList) {
        console.log('No tents found in the database');
        res.status(404).json({ error: 'No tents found in the database' });
        return;
      }

      // Log retrieved tent list (optional)
      // console.log('Current tent list:', currentTentList);

      // Find the highest existing tent ID
      const lastTentKey = Object.keys(currentTentList).sort().pop();
      console.log('Extracted last tent key:', lastTentKey);

      const lastTentId = parseInt(lastTentKey.slice(4)); // Extract the number from the key
      console.log('Extracted tent ID:', lastTentId);

      if (isNaN(lastTentId)) {
        console.log('Invalid tent ID format');
        res.status(500).json({ error: 'Invalid tent ID format' });
        return;
      }

      // Log attempt to delete tent
      console.log(`Attempting to delete tent tent${lastTentId}`);

      // Remove the last tent from the database
      await tentRef.child(lastTentKey).remove();

      console.log(`Tent tent${lastTentId} deleted successfully`);
      res.status(200).json({ message: `Tent tent${lastTentId} deleted successfully` });
    });
  } catch (error) {
    console.error('Error deleting last tent:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getTotalTentCount(req, res) {
  try {
    const tentRef = admin.database().ref('tents');

    await tentRef.once('value', (snapshot) => {
      const totalTents = snapshot.numChildren(); // Get the total number of children (tents)
      res.status(200).json({ totalTents });
    });
  } catch (error) {
    console.error('Error fetching total tent count:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getAllTents(req, res) {
  try {
    const tentRef = admin.database().ref('tents');
    const snapshot = await tentRef.once('value');
    const tents = snapshot.val();
    res.status(200).json({ tents });
  } catch (error) {
    console.error('Error fetching tents:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  createTent,
  deleteTent,
  getTotalTentCount,
  getAllTents
};