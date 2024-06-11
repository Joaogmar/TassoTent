document.addEventListener('DOMContentLoaded', (event) => {
    const chatId = 'General Chat'; 
    const messageContainer = document.getElementById('messageContainer');
    const messageForm = document.getElementById('messageForm');
    const messageInput = document.getElementById('messageInput');

    const fetchMessages = async () => {
        try {
            const response = await fetch(`/getMessages/${chatId}`);
            const messages = await response.json();
            messageContainer.innerHTML = '';

            for (const messageKey in messages) {
                const message = messages[messageKey];
                const messageElement = document.createElement('div');
                messageElement.classList.add('message');
                messageElement.innerHTML = `<span class="sender">${message.sender}:</span> ${message.text}`;
                messageContainer.appendChild(messageElement);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const sendMessage = async (sender, text) => {
        try {
            await fetch('/sendMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ chatId, sender, text }),
            });
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    messageForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const text = messageInput.value.trim();
        const sender = 'User';

        if (text !== '') {
            await sendMessage(sender, text);
            messageInput.value = '';
            await fetchMessages();
        }
    });

    fetchMessages();
    setInterval(fetchMessages, 1000); 
});

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