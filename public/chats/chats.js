document.addEventListener("DOMContentLoaded" , async () => {
    const messages = document.getElementById('message-input').trim();
    const sendBtn = document.querySelector('button');
    sendBtn.addEventListener('click' , async() => {
        const token = localStorage.getItem('token');
        if(!token){
            alert('User not logged in');
            return;
        }
        try{
            const response = await axios.get(`http://localhost:3000/chat-app/message` ,messages,{
                headers : {'Authorization' : token}
            });
            if(response.status === 201){
                console.log('Message sent successfully:', response.data.newMessage);
                messages.value = '';
                addMessageToChatUi(response.data.newMessage);
            }
        } catch (error) {
            console.error('Error sending message:', error);
            alert('An error occurred while sending the message');
        }
    })
});

function addMessageToChatUi(message) {
    const chatContainer = document.querySelector('.chat-container');
    const messageElement = document.createElement('div');
    messageElement.textContent = `${message.token}:${message.message}`;
    chatContainer.appendChild(message);
}