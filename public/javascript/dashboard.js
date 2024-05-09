document.getElementById('createAdminForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const adminData = {
    username: formData.get('username'),
    password: formData.get('password')
  };

  try {
    console.log("Sending admin data:", adminData);

    const response = await fetch('/admins', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(adminData)
    });

    console.log("Server response:", response);

    if (response.ok) {
      console.log('Admin created successfully');
      await displayTotalTentCount();
    } else {
      console.error('Failed to create admin:', response.statusText);
    }
  } catch (error) {
    console.error('Error creating admin:', error);
  }
});

const plusButton = document.querySelector('.plus-btn');
plusButton.addEventListener('click', async () => {
  try {
    console.log('Sending request to create a new tent...');

    const response = await fetch('/createTent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    console.log("Server response:", response);

    if (response.ok) {
      console.log('Tent created successfully');
      await displayTotalTentCount();
    } else {
      console.error('Failed to create tent:', response.statusText);
    }
  } catch (error) {
    console.error('Error creating tent:', error);
  }
});

const minusButton = document.querySelector('.minus-btn');
minusButton.addEventListener('click', async () => {
  try {
    console.log('Sending request to remove a tent...');

    const response = await fetch('/removeTent', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    console.log("Server response:", response);

    if (response.ok) {
      console.log('Tent removed successfully');
      await displayTotalTentCount();
    } else {
      console.error('Failed to remove tent:', response.statusText);
    }
  } catch (error) {
    console.error('Error removing tent:', error);
  }
});

async function displayTotalTentCount() {
  try {
    const response = await fetch('/totalTentCount');
    if (response.ok) {
      const data = await response.json();
      document.getElementById('totalTents').innerText = `Total Tents: ${data.totalTents}`;
    } else {
      console.error('Failed to fetch total tent count:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching total tent count:', error);
  }
} 

async function displayAdminUsername() {
  try {
      const response = await fetch('/getAdminUsername'); // Assuming this endpoint returns the admin's username
      if (response.ok) {
          const data = await response.json();
          const adminUsername = data.username;
          document.getElementById('adminUsername').innerText = adminUsername;
      } else {
          console.error('Failed to fetch admin username:', response.statusText);
      }
  } catch (error) {
      console.error('Error fetching admin username:', error);
  }
}

// Call the function on page load
window.addEventListener('load', () => {
  displayTotalTentCount();
  displayAdminUsername(); // Display the admin's username
});

// Event listener for logout button
document.querySelector('.nav-btn:last-of-type').addEventListener('click', async () => {
  try {
      const response = await fetch('/logout', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
      });

      if (response.ok) {
          console.log('Logged out successfully');
          // Redirect to home page or login page
          window.location.href = 'start.html'; // Redirect to start.html after logout
      } else {
          console.error('Failed to log out:', response.statusText);
      }
  } catch (error) {
      console.error('Error logging out:', error);
  }
});