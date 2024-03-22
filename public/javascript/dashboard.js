document.getElementById('createUserForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const userData = {
      username: formData.get('username'),
      password: formData.get('password'),
      role: formData.get('role')
    };
  
    try {
      console.log("Sending user data:", userData); // Log user data before sending
  
      const response = await fetch('/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
  
      console.log("Server response:", response); // Log the server response
  
      if (response.ok) {
        console.log('User created successfully');
        // Optionally, redirect or perform any other action upon successful user creation
      } else {
        console.error('Failed to create user:', response.statusText);
        // Optionally, handle error response
      }
    } catch (error) {
      console.error('Error creating user:', error);
      // Optionally, handle network errors
    }
  });

const plusButton = document.querySelector('.plus-btn');

plusButton.addEventListener('click', async () => {
    try {
      console.log('Sending request to create a new tent...');
  
      const response = await fetch('/createTent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // Assuming no body data is needed for tent name generation
        },
        // Optional body if you want to send additional data along with the request
        // body: JSON.stringify({ /* data */ })
      });
  
      console.log("Server response:", response);
  
      if (response.ok) {
        console.log('Tent created successfully');
        // Optionally, update the UI to reflect the new tent creation (e.g., update total tents)
      } else {
        console.error('Failed to create tent:', response.statusText);
        // Optionally, handle errors by displaying an error message to the user
      }
    } catch (error) {
      console.error('Error creating tent:', error);
      // Optionally, handle network errors
    }
  });
