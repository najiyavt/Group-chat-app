async function addMessage(event) {
    event.preventDefault(); 
    const chatsInput = document.getElementById('chats-input');
    const chats = chatsInput.value.trim();

    const token = localStorage.getItem('token');
    

    try {
        const response = await axios.post('http://localhost:3000/chat-app/chats', { chats }, {
            headers: { 'Authorization': token }
        });
        console.log('Message sent successfully:', response.data);
        chatsInput.value = '';
        alert('Message sent and stored successfully!');
        addMessageToChatUi(response.data.newchat); 
    } catch (error) {
        console.error('Error sending message:', error);
        alert('An error occurred while sending the message');
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const pre = document.getElementById('users-list');
        pre.innerHTML = '';
        const token = localStorage.getItem('token');

        const response = await axios.get('http://localhost:3000/chat-app', {
            headers: { 'Authorization': token }
        });
        console.log('Fetched response:', response.data);
        console.log('Message response:', response.data.message);

        response.data.chat.forEach(chat => {
           addMessageToChatUi(chat)
        });
    } catch (error) {
        console.error('Error fetching message:', error);
        alert('An error occurred while fetching the message');
    }
});

function addMessageToChatUi(message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.textContent = `${message.name}: ${message.chats}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
}