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
function openSettingsPopup() {
    const popup = document.getElementById('settPopup');
    const overlay = document.getElementById('settOverlay');
    popup.style.display = 'block';
    popup.classList.remove('hide');
    overlay.style.display = 'block';
}

// Event listener for opening the settings popup
document.getElementById('settButton').addEventListener('click', openSettingsPopup);

// Event listener for closing the settings popup
document.getElementById('closeSett').addEventListener('click', function () {
    const popup = document.getElementById('settPopup');
    const overlay = document.getElementById('settOverlay');
    popup.classList.add('hide');
    overlay.style.display = 'none';
});

// Event listener for closing the settings popup when overlay is clicked
document.getElementById('settOverlay').addEventListener('click', function (event) {
    const popup = document.getElementById('settPopup');
    const overlay = document.getElementById('settOverlay');
    if (event.target === overlay) {
        popup.classList.add('hide');
        overlay.style.display = 'none';
    }
});

// Event listener for hiding the popup when animation ends
document.getElementById('settPopup').addEventListener('animationend', function (event) {
    if (event.animationName === 'slideOut') {
        this.style.display = 'none';
    }
});

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
