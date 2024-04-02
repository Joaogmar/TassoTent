import { generateRandomPassword } from './src/utils.js';

window.addEventListener('load', () => {
  populateTentTable();
  const updateAllPasswordsBtn = document.getElementById('updateAllPasswordsBtn');
  updateAllPasswordsBtn.addEventListener('click', updateAllPasswords);
});

async function populateTentTable() {
  try {
    const response = await fetch('/allTents');
    if (response.ok) {
      const data = await response.json();
      const tentTableBody = document.querySelector('#tentTable tbody');
      tentTableBody.innerHTML = ''; // Clear existing rows
      Object.keys(data.tents).forEach(key => {
        const tent = data.tents[key];
        const row = `
        <tr>
          <td>${tent.username}</td>
          <td id="password-${key}">${tent.password}</td>
          <td><button class="generate-password-btn" data-key="${key}">Generate Password</button></td> </tr>
        `;
        tentTableBody.innerHTML += row;
      });
      addGeneratePasswordEventListeners();
    } else {
      console.error('Failed to fetch tent data:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching tent data:', error);
  }
}

async function updateTentPassword(tentId, newPassword) {
  try {
    const response = await fetch('/updateTentPassword', {
      method: 'PUT', // Use PUT for updates
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tentId, newPassword })
    });

    if (response.ok) {
      console.log('Tent password updated successfully:', tentId);
    } else {
      console.error('Failed to update tent password:', response.statusText);
      // Handle update errors (e.g., display an error message to the user)
    }
  } catch (error) {
    console.error('Error updating tent password:', error);
    // Handle update errors (e.g., display an error message to the user)
  }
}

async function addGeneratePasswordEventListeners() {
  const generatePasswordButtons = document.querySelectorAll('.generate-password-btn');
  generatePasswordButtons.forEach(button => {
    button.addEventListener('click', async (event) => {
      event.preventDefault(); // Prevent default form submission

      const tentId = button.dataset.key;
      const passwordCell = document.getElementById(`password-${tentId}`);

      // Generate a random password
      const newPassword = generateRandomPassword(); // Define newPassword here

      // Update the password display in the table
      passwordCell.textContent = newPassword;

      // Send update request to server
      await updateTentPassword(tentId, newPassword);
    });
  });
}

async function updateAllPasswords() {
  try {
    const response = await fetch('/updateAllPasswords', {
      method: 'PUT', // Use PUT for updates
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      console.log('All tent passwords updated successfully');
    } else {
      console.error('Failed to update all tent passwords:', response.statusText);
      // Handle update errors (e.g., display an error message to the user)
    }
  } catch (error) {
    console.error('Error updating all tent passwords:', error);
    // Handle update errors (e.g., display an error message to the user)
  }
}
