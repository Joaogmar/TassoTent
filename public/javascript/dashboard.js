// Function to create a new user
document.getElementById('createUserForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const userData = {
    username: formData.get('username'),
    password: formData.get('password'),
    role: formData.get('role')
  };

  try {
    console.log("Sending user data:", userData);

    const response = await fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    console.log("Server response:", response);

    if (response.ok) {
      console.log('User created successfully');
      await displayTotalTentCount();
    } else {
      console.error('Failed to create user:', response.statusText);
    }
  } catch (error) {
    console.error('Error creating user:', error);
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
      console.log('Sending request to delete the last tent...');

      const response = await fetch('/deleteTent', {
          method: 'DELETE',
      });

      console.log("Server response:", response);

      if (response.ok) {
          console.log('Last tent deleted successfully');
          await displayTotalTentCount(); 
      } else {
          console.error('Failed to delete last tent:', response.statusText);
      }
  } catch (error) {
      console.error('Error deleting last tent:', error);
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

window.addEventListener('load', displayTotalTentCount);