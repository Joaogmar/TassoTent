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
                messageElement.innerHTML = `<span class="sender">${message.sender}:</span> ${message.text} <span class="timestamp">${new Date(message.timestamp).toLocaleString()}</span>`;
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
                body: JSON.stringify({ chatId, text }),
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

document.querySelector('.nav-btn:last-of-type').addEventListener('click', async () => {
    try {
        const response = await fetch('/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
  
        if (response.ok) {
            console.log('Logged out successfully');
            window.location.href = 'start.html'; 
        } else {
            console.error('Failed to log out:', response.statusText);
        }
    } catch (error) {
        console.error('Error logging out:', error);
    }
});