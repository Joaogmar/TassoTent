document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        
        // Get username and password
        const username = loginForm.elements['username'].value;
        const password = loginForm.elements['password'].value;

        // Example: Check username and password
        if (username === 'adm' && password === 'adm') {
            alert('Login successful!');
            // Redirect to dashboard.html
            window.location.href = 'dashboard.html';
        } else {
            alert('Invalid username or password');
        }
    });
});
