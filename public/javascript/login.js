document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
  
    loginForm.addEventListener('submit', async function (event) {
      event.preventDefault();
  
      const username = loginForm.elements['username'].value;
      const password = loginForm.elements['password'].value;
  
      try {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });
  
        const data = await response.json();

        if (data.status === 'success') {
          if (data.role === 'admin') {
            window.location.href = '/dashboard.html';
          } else if (data.role === 'tent') {
            window.location.href = '/tent.html';
          } else {
            alert('Invalid role');
          }
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred during login');
      }
    });
  });
  