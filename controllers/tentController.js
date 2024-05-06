const admin = require('../config/firebaseConfig');
const { generateRandomPassword } = require('../src/utils');

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
    
    // Access the 'tents' node directly
    const tentRef = userRef.child('tents');
    
    const snapshot = await tentRef.once('value');
    const tents = snapshot.val();
    
    // Check if any tents were found
    if (!tents) {
      console.log('No tents found');
      return res.status(404).json({ error: 'No tents found' });
    }

    // Send the tents data in the response
    res.status(200).json({ tents });
  } catch (error) {
    console.error('Error fetching tents:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateTentPassword(req, res) {
  try {
    const { tentId } = req.body;

    if (!tentId) {
      return res.status(400).json({ error: 'Missing required field (tentId)' });
    }

    // Generate a new random password
    const newPassword = generateRandomPassword();

    const userRef = admin.database().ref('users');
    const tentRef = userRef.child('tents').child(tentId);

    // Validate tent existence (optional)
    const tentSnapshot = await tentRef.once('value');
    if (!tentSnapshot.exists()) {
      return res.status(404).json({ error: 'Tent not found' });
    }

    await tentRef.update({ password: newPassword }); // Store password in plain text (not recommended)

    console.log('Tent password updated successfully:', tentId);
    res.status(200).json({ message: 'Tent password updated successfully', newPassword });
  } catch (error) {
    console.error('Error updating tent password:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateAllPasswords(req, res) {
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

    const updates = {};
    Object.keys(tents).forEach(tentId => {
      const newPassword = generateRandomPassword();
      updates[`${tentId}/password`] = newPassword;
    });

    await tentRef.update(updates);

    console.log('All tent passwords updated successfully');
    res.status(200).json({ message: 'All tent passwords updated successfully' });
  } catch (error) {
    console.error('Error updating all tent passwords:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function tentLogin(req, res) {
  const { username, password } = req.body;

  // Perform authentication with your database (e.g., Firebase)
  const tentRef = admin.database().ref('users/tents');
  const snapshot = await tentRef.orderByChild('username').equalTo(username).once('value');
  const tentData = snapshot.val();

  // Check if the user exists and the password is correct
  if (tentData && tentData[Object.keys(tentData)[0]].password === password) {
      // Store tent information in the session
      req.session.user = {
          username: tentData[Object.keys(tentData)[0]].username,
          role: 'tent' // Indicate the user's role
      };
      res.status(200).json({ message: 'Tent login successful' });
  } else {
      res.status(401).json({ error: 'Invalid username or password' });
  }
}

module.exports = {
  createTent,
  tentLogin,
  removeTent,
  getTotalTentCount, 
  getAllTents,
  updateTentPassword,
  updateAllPasswords
};
