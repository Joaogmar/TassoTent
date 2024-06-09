document.getElementById('door-button').addEventListener('click', function () {
    console.log('Botão clicado!');
    const iconElement = document.getElementById('door-icon');
    if (iconElement.innerText === 'door_front') {
        iconElement.innerText = 'meeting_room';
    } else {
        iconElement.innerText = 'door_front';
    }
});

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

document.getElementById('closeUpdate').addEventListener('click', function () {
    const popup = document.getElementById('updatePopup');
    const overlay = document.getElementById('updateOverlay');
    popup.classList.add('hide');
    overlay.style.display = 'none';
});

document.getElementById('updateOverlay').addEventListener('click', function (event) {
    const popup = document.getElementById('updatePopup');
    const overlay = document.getElementById('updateOverlay');
    if (event.target === overlay) {
        popup.classList.add('hide');
        overlay.style.display = 'none';
    }
});

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

async function handleLogout() {
    try {
        console.log('Logging out...');

        const response = await fetch('/logout', {
            method: 'POST',
        });

        if (response.ok) {
            console.log('Logout successful');
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

const logoutButton = document.querySelector('.nav-btn.logout-btn');
if (logoutButton) {
    logoutButton.addEventListener('click', handleLogout);
} else {
    console.error('Logout button not found');
}

document.getElementById('settButton').addEventListener('click', openSettingsPopup);

function hidePopup() {
    const popup = document.getElementById('updatePopup');
    const overlay = document.getElementById('updateOverlay');
    popup.classList.add('hide');
    overlay.style.display = 'none';
}

document.getElementById('updatePasswordForm').addEventListener('submit', async function (event) {
    event.preventDefault(); 

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
            hidePopup(); 
        } else {
            console.error('Failed to update password:', response.statusText);
            alert('Failed to update password. Please try again.');
        }
    } catch (error) {
        console.error('Error updating password:', error);
        alert('An error occurred while updating the password. Please try again.');
    }
});