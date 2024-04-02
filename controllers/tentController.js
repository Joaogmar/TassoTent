const admin = require('../config/firebaseConfig');

async function createTent(req, res) {
  try {
    console.log('Creating a new tent...');

    const userRef = admin.database().ref('users');
    const tentRef = userRef.child('tents');
    const snapshot = await tentRef.once('value');
    const currentTentCount = snapshot.numChildren();
    const newTentId = currentTentCount + 1;
    const newTentName = `tent${newTentId}`;
    const newTentRef = tentRef.child(newTentName);

    const tentData = {
      username: newTentName,
      password: newTentName, 
    };

    await newTentRef.set(tentData);

    console.log('Tent created successfully with name:', newTentName);
    res.status(201).json({ message: 'Tent created successfully' });
  } catch (error) {
    console.error('Error creating tent:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function removeTent(req, res) {
  try {
    const userRef = admin.database().ref('users');
    const tentRef = userRef.child('tents');

    // Retrieve all tents
    const snapshot = await tentRef.once('value');
    const tents = snapshot.val();

    if (!tents) {
      console.log('No tents found');
      return res.status(404).json({ error: 'No tents found' });
    }

    // Find the highest numbered tent
    let highestTentId;
    let highestTentNumber = 0;
    Object.keys(tents).forEach(tentId => {
      const tentNumber = parseInt(tentId.replace('tent', ''));
      if (tentNumber > highestTentNumber) {
        highestTentNumber = tentNumber;
        highestTentId = tentId;
      }
    });

    if (!highestTentId) {
      console.log('No tent found');
      return res.status(404).json({ error: 'No tent found' });
    }

    // Remove the highest numbered tent
    await tentRef.child(highestTentId).remove();

    console.log('Tent removed successfully:', highestTentId);
    res.status(200).json({ message: `Tent ${highestTentId} removed successfully` });
  } catch (error) {
    console.error('Error removing tent:', error);
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
  removeTent,
  getTotalTentCount, 
  getAllTents,
  updatePassword,
  updateAllPasswords
};
