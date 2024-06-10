
document.getElementById('move-button').addEventListener('click', function () {
    console.log('Botão clicado!');
    const iconElement = document.getElementById('move-icon');
    const textElement = document.getElementById('move-text');
    if (iconElement.innerText === 'wifi_tethering_error') {
        iconElement.innerText = 'radar';
        textElement.innerText = 'Moviment Not Detected';
    } else {
        iconElement.innerText = 'wifi_tethering_error';
        textElement.innerText = 'Moviment Detected';
    }
});

async function openUpdatePopup() {
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

document.getElementById('updateButton').addEventListener('click', openUpdatePopup);

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

document.getElementById('updateButton').addEventListener('click', openUpdatePopup);

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

document.addEventListener('DOMContentLoaded', function () {
    fetchTentData();

    setInterval(fetchTentData, 1000);
});

async function fetchTentData() {
    try {
        const response = await fetch('/getTentData');
        if (response.ok) {
            const data = await response.json();
            updateTemperature(data.temperature);
            updateHumidity(data.humidity);
            updateAirQuality(data.air);
        } else {
            console.error('Failed to fetch tent data:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching tent data:', error);
    }
}

function updateTemperature(temperature) {
    const temperatureButton = document.querySelector('.bi-square:nth-of-type(1)');
    if (temperatureButton) {
        temperatureButton.innerHTML = `<span class="material-symbols-outlined bi-icon">device_thermostat</span>${temperature}°C`;
    }
}

function updateHumidity(humidity) {
    const humidityButton = document.querySelector('.bi-square:nth-of-type(2)');
    if (humidityButton) {
        humidityButton.innerHTML = `<span class="material-symbols-outlined bi-icon">humidity_percentage</span>${humidity}%`;
    }
}

function updateAirQuality(air) {
    const airButton = document.querySelector('#air-quality-button');
    if (airButton) {
        airButton.innerHTML = `<span class="material-symbols-outlined bi-icon">air</span>${air}`;
    } else {
        console.error('Air quality button not found');  
    }
}