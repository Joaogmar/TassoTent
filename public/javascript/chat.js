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

// Event listener for logout button
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
            // Redirect to home page or login page
            window.location.href = 'start.html'; // Redirect to start.html after logout
        } else {
            console.error('Failed to log out:', response.statusText);
        }
    } catch (error) {
        console.error('Error logging out:', error);
    }
  });