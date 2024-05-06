document.addEventListener("DOMContentLoaded", function() {
    var nextButton = document.getElementById("nextButton");
    var loginPopup = document.getElementById("loginPopup");
    var closeModalButton = document.getElementById("closeModal");
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

    closeModalButton.addEventListener("click", function() {
        loginPopup.style.opacity = "0";
        overlay.style.opacity = "0";
        setTimeout(function() {
            loginPopup.style.display = "none";
            overlay.style.display = "none";
            document.body.classList.remove("no-scroll");
        }, 300);
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
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Login successful
            // Redirect to tent.html
            window.location.href = 'tent.html';
        } else if (data.error) {
            // Display the error message
            console.error(data.error);
            alert(data.error);
        }
    })
    .catch(error => {
        // Handle fetch error
        console.error('Error:', error);
        alert('An error occurred during the login process.');
    });
}

// Function to handle admin login
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
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Login successful
            // Redirect to dashboard.html
            window.location.href = 'dashboard.html';
        } else if (data.error) {
            // Display the error message
            console.error(data.error);
            alert(data.error);
        }
    })
    .catch(error => {
        // Handle fetch error
        console.error('Error:', error);
        alert('An error occurred during the login process.');
    });
}