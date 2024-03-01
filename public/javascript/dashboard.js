document.getElementById('createUserForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const userData = {
      username: formData.get('username'),
      email: formData.get('email'),
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