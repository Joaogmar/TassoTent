// Function to handle the door button click
document.getElementById('door-button').addEventListener('click', function () {
    console.log('Botão clicado!');
    const iconElement = document.getElementById('door-icon');
    if (iconElement.innerText === 'door_front') {
        iconElement.innerText = 'meeting_room';
    } else {
        iconElement.innerText = 'door_front';
    }
});

// Function to handle the fan button click
document.getElementById('fan-button').addEventListener('click', function () {
    console.log('Botão clicado!');
    const iconElement = document.getElementById('fan-icon');
    const textElement = document.getElementById('fan-text');
    if (iconElement.innerText === 'mode_fan') {
        iconElement.innerText = 'mode_fan_off';
        textElement.innerText = 'Off';
    } else {
        iconElement.innerText = 'mode_fan';
        textElement.innerText = 'On';
    }
});

// Function to open the settings popup
async function openSettingsPopup() {
    try {
        const response = await fetch('/getTentUsername');
        if (response.ok) {
            const data = await response.json();
            const tentNameElement = document.getElementById('tent-name');
            tentNameElement.textContent = data.username;
        } else {
            console.error('Failed to fetch tent name:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching tent name:', error);
    }

    const popup = document.getElementById('updatePopup');
    const overlay = document.getElementById('updateOverlay');
    popup.style.display = 'block';
    popup.classList.remove('hide');
    overlay.style.display = 'block';
}

document.getElementById('settButton').addEventListener('click', openSettingsPopup);

// Event listener for closing the settings popup
document.getElementById('closeUpdate').addEventListener('click', function () {
    const popup = document.getElementById('updatePopup');
    const overlay = document.getElementById('updateOverlay');
    popup.classList.add('hide');
    overlay.style.display = 'none';
});

// Event listener for closing the settings popup when overlay is clicked
document.getElementById('updateOverlay').addEventListener('click', function (event) {
    const popup = document.getElementById('updatePopup');
    const overlay = document.getElementById('updateOverlay');
    if (event.target === overlay) {
        popup.classList.add('hide');
        overlay.style.display = 'none';
    }
});

// Event listener for hiding the popup when animation ends
document.getElementById('updatePopup').addEventListener('animationend', function (event) {
    if (event.animationName === 'slideOut') {
        this.style.display = 'none';
    }
});

function togglePasswordVisibility() {
    var passwordInput = document.getElementById('userNewPassword');
    var passwordIcon = document.querySelector('.toggle-password span');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passwordIcon.textContent = 'visibility_off';
    } else {
        passwordInput.type = 'password';
        passwordIcon.textContent = 'visibility';
    }
}

// Function to handle logout
async function handleLogout() {
    try {
        console.log('Logging out...');

        // Send a POST request to the logout endpoint on the server
        const response = await fetch('/logout', {
            method: 'POST',
        });

        // Check if the response was successful
        if (response.ok) {
            console.log('Logout successful');
            // Redirect the user to the start.html page
            window.location.href = 'start.html';
        } else {
            console.error('Failed to logout:', response.statusText);
            alert('Failed to logout. Please try again.');
        }
    } catch (error) {
        console.error('Error logging out:', error);
        alert('An error occurred during logout. Please try again.');
    }
}

// Add an event listener to the logout button
const logoutButton = document.querySelector('.nav-btn.logout-btn');
if (logoutButton) {
    logoutButton.addEventListener('click', handleLogout);
} else {
    console.error('Logout button not found');
}

document.getElementById('settButton').addEventListener('click', openSettingsPopup);

// Function to hide the popup
function hidePopup() {
    const popup = document.getElementById('updatePopup');
    const overlay = document.getElementById('updateOverlay');
    popup.classList.add('hide');
    overlay.style.display = 'none';
}

// Event listener for updating the password
document.getElementById('updatePasswordForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission

    const newPassword = document.getElementById('userNewPassword').value;
    try {
        const response = await fetch('/updateTentPasswordUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ newPassword })
        });
        if (response.ok) {
            const data = await response.json();
            alert(data.message);
            hidePopup(); // Call the function to hide the popup
        } else {
            console.error('Failed to update password:', response.statusText);
            alert('Failed to update password. Please try again.');
        }
    } catch (error) {
        console.error('Error updating password:', error);
        alert('An error occurred while updating the password. Please try again.');
    }
});