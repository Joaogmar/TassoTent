const admin = require('../config/firebaseConfig');

async function createTent(req, res) {
  try {
    console.log('Creating a new tent...');

    const userRef = admin.database().ref('users');
    const tentRef = userRef.child('tents');

    // Fetch current tent count
    const snapshot = await tentRef.once('value');
    const currentTentCount = snapshot.numChildren();

    // Generate the ID for the new tent
    const newTentId = currentTentCount + 1;
    const newTentName = `tent${newTentId}`;
    const newTentRef = tentRef.child(newTentName);

    // Tent data
    const tentData = {
      username: newTentName,
      password: newTentName, // Using the same name for simplicity (use a secure method in production)
    };

    // Set the new tent data
    await newTentRef.set(tentData);

    console.log('Tent created successfully with name:', newTentName);
    res.status(201).json({ message: 'Tent created successfully' });
  } catch (error) {
    console.error('Error creating tent:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteTent(req, res) {
  try {
    const userRef = admin.database().ref('users');
    const username = req.body.username;

    // Check if the user exists
    const userSnapshot = await userRef.child(username).once('value');
    if (!userSnapshot.exists()) {
      console.log('User does not exist');
      return res.status(404).json({ error: 'User does not exist' });
    }

    const tentRef = userRef.child(`${username}/tents`);

    // Fetch current tent list using a transaction for consistency
    await tentRef.once('value', async (snapshot) => {
      const currentTentList = snapshot.val();

      if (!currentTentList) {
        console.log('No tents found for the user');
        return res.status(404).json({ error: 'No tents found for the user' });
      }

      const lastTentKey = Object.keys(currentTentList).sort().pop();
      console.log('Extracted last tent key:', lastTentKey);

      const lastTentId = parseInt(lastTentKey.slice(4));
      console.log('Extracted tent ID:', lastTentId);

      if (isNaN(lastTentId)) {
        console.log('Invalid tent ID format');
        return res.status(500).json({ error: 'Invalid tent ID format' });
      }

      console.log(`Attempting to delete tent tent${lastTentId}`);

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
    const userRef = admin.database().ref('users');
    const tentRef = userRef.child('tents');

    await tentRef.once('value', (snapshot) => {
      const totalTents = snapshot.numChildren();
      res.status(200).json({ totalTents });
    });
  } catch (error) {
    console.error('Error fetching total tent count:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getAllTents(req, res) {
  try {
    const userRef = admin.database().ref('users');
    const username = req.body.username;

    // Check if the user exists
    const userSnapshot = await userRef.child(username).once('value');
    if (!userSnapshot.exists()) {
      console.log('User does not exist');
      return res.status(404).json({ error: 'User does not exist' });
    }

    const tentRef = userRef.child(`${username}/tents`);
    const snapshot = await tentRef.once('value');
    const tents = snapshot.val();
    res.status(200).json({ tents });
  } catch (error) {
    console.error('Error fetching tents:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function updatePassword(req, res) {
  try {
    const { username, key } = req.body;
    const { password } = req.body;

    const userRef = admin.database().ref('users');
    const userSnapshot = await userRef.child(username).once('value');
    if (!userSnapshot.exists()) {
      console.log('User does not exist');
      return res.status(404).json({ error: 'User does not exist' });
    }

    const tentRef = userRef.child(`${username}/tents`);
    await tentRef.child(key).update({ password });

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateAllPasswords(req, res) {
  try {
    const { username } = req.body;
    const newPassword = generateRandomPassword();
    
    const userRef = admin.database().ref('users');
    const userSnapshot = await userRef.child(username).once('value');
    if (!userSnapshot.exists()) {
      console.log('User does not exist');
      return res.status(404).json({ error: 'User does not exist' });
    }

    const tentRef = userRef.child(`${username}/tents`);
    const snapshot = await tentRef.once('value');
    snapshot.forEach(childSnapshot => {
      const key = childSnapshot.key;
      tentRef.child(key).update({ password: newPassword });
    });

    res.status(200).json({ message: 'Passwords updated successfully' });
  } catch (error) {
    console.error('Error updating passwords:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  createTent,
  deleteTent,
  getTotalTentCount, 
  getAllTents,
  updatePassword,
  updateAllPasswords
};
