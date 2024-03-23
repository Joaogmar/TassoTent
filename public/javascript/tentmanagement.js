// tentmanagement.js
window.addEventListener('load', () => {
  populateTentTable();
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
            <td><button class="generate-password-btn" data-key="${key}">Generate Password</button></td> <!-- Button for generating password -->
          </tr>
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

function addGeneratePasswordEventListeners() {
  const generatePasswordButtons = document.querySelectorAll('.generate-password-btn');
  generatePasswordButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const key = button.dataset.key;
      const newPassword = generateRandomPassword();
      document.getElementById(`password-${key}`).textContent = newPassword;
      await updatePasswordInDatabase(key, newPassword);
    });
  });
}

function generateRandomPassword() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < 5; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return password;
}

async function updatePasswordInDatabase(key, newPassword) {
  try {
    await fetch(`/updatePassword/${key}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password: newPassword })
    });
    console.log('Password updated successfully in the database');
  } catch (error) {
    console.error('Error updating password in the database:', error);
  }
}

// Add event listener for updating all passwords
document.getElementById('updateAllPasswordsBtn').addEventListener('click', async () => {
  const keys = Array.from(document.querySelectorAll('.generate-password-btn')).map(button => button.dataset.key);
  keys.forEach(async key => {
    const newPassword = generateRandomPassword();
    document.getElementById(`password-${key}`).textContent = newPassword;
    await updatePasswordInDatabase(key, newPassword);
  });
});