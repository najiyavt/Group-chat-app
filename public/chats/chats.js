async function addMessage(event) {
    event.preventDefault(); 
    const messages = document.getElementById('message-input');
    const message = messages.value.trim();
    console.log('message',message);

    const token = localStorage.getItem('token');
    try{
        const response = await axios.post(`http://localhost:3000/chatapp/message` ,{ message },{
            headers : {'Authorization' : token }
        });
        console.log('Message response ',response);
        console.log('Message sent successfully:', response.data.newMessage);
        messages.value = '';
        alert('Message sent and stored successfully!')
    } catch (error) {
        console.error('Error sending message:', error);
        alert('An error occurred while sending the message');
    }
}
   


