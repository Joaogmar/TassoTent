document.addEventListener("DOMContentLoaded", function() {
    var nextButton = document.getElementById("nextButton");
    var loginPopup = document.getElementById("loginPopup");
    var overlay = document.getElementById("overlay");

    nextButton.addEventListener("click", function() {
        loginPopup.style.display = "block";
        overlay.style.display = "block";
        document.body.classList.add("no-scroll");
        setTimeout(function() {
            loginPopup.style.opacity = "1";
            loginPopup.style.transform = "scale(1) translate(-50%, -50%)";
            overlay.style.opacity = "1";
        }, 10);
    });

    overlay.addEventListener("click", function() {
        loginPopup.style.opacity = "0";
        overlay.style.opacity = "0";
        setTimeout(function() {
            loginPopup.style.display = "none";
            overlay.style.display = "none";
            document.body.classList.remove("no-scroll");
        }, 300);
    });

    var switchInput = document.getElementById("switch");
    var loginTitle = document.querySelector(".login-title");

    switchInput.addEventListener("change", function() {

        if (switchInput.checked) {
            loginTitle.innerText = "Login as Admin";
        } else {
            loginTitle.innerText = "Login as User";
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const bodyScroll = new PerfectScrollbar('body');
});

function handleTentLogin(event) {
    event.preventDefault(); // Prevent the form from submitting the default way

    // Retrieve form data
    const username = document.getElementById('tentUsername').value;
    const password = document.getElementById('tentPassword').value;

    // Make a POST request to the backend tent login endpoint
    fetch('/login/tent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => {
        console.log("Received response:", response);
        return response.json();
    })
    .then(data => {
        console.log("Received data:", data);

        // Check for success message
        if (data.message === 'Tent login successful') {
            console.log("Tent login successful. Redirecting to tent.html...");
            // Redirect to tent.html
            window.location.href = 'tent.html';
        } else {
            // Handle unexpected or error response
            console.error("Unexpected or error response:", data);
            alert(data.message || 'An unexpected error occurred during the login process.');
        }
    })
    .catch(error => {
        // Handle fetch error
        console.error("Error during fetch:", error);
        alert('An error occurred during the login process.');
    });
}

function handleAdminLogin(event) {
    event.preventDefault(); // Prevent the form from submitting the default way

    // Retrieve form data
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;

    // Make a POST request to the backend admin login endpoint
    fetch('/login/admin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => {
        console.log("Received response:", response);
        // Check if the response is okay
        if (!response.ok) {
            console.error('Server responded with an error:', response.statusText);
            alert('Login failed: ' + response.statusText);
            return;
        }
        return response.json();
    })
    .then(data => {
        console.log("Received data:", data);
        if (data && data.message === 'Admin login successful') {
            // Login successful
            console.log("Login successful, redirecting to dashboard.html");
            window.location.href = 'dashboard.html';
        } else {
            console.error("Unexpected response data:", data);
            alert('Unexpected response received: ' + JSON.stringify(data));
        }
    })
    .catch(error => {
        // Handle fetch error
        console.error('Fetch error:', error);
        alert('An error occurred during the login process.');
    });
}

AOS.init({
    duration: 1200, // valores em milissegundos
    once: true, // animação acontece apenas uma vez quando o elemento aparece na tela
  });