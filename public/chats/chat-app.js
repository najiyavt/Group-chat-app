const token = localStorage.getItem('token');
const chatsInput = document.getElementById('chats-input');
const sendBtn = document.getElementById('sendBtn');


document.addEventListener("DOMContentLoaded", async () => {
    
    let loggedInUser = '';
    if(token){
    const payload = JSON.parse(atob(token.split('.')[1]));
    loggedInUser = payload.name;
    console.log('Logged in user: ', loggedInUser);
    }
    function addMessageToChatUi(message,sender) {
        const chatBox = document.getElementById('chat-box');
        const messageElement = document.createElement('div');
        if(message===''){
            messageElement.classList.add('join-message');
            messageElement.innerHTML = `${sender === loggedInUser ? 'You' : sender} joined the chat!`;
        }else{
            messageElement.classList.add('message');
            messageElement.innerHTML = `<strong>${sender === loggedInUser ? 'You' : sender}:</strong> ${message}`;
        }
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
    }
    addMessageToChatUi('',loggedInUser);

    async function fetchMessagesFromLocalStorage(){
        const chats = JSON.parse(localStorage.getItem('chats')) || [];
        chats.forEach(chat => addMessageToChatUi(chat.chats , chat.name));

        if(chats.length >0 ){
            return chats[chats.length -1].id;
        }else{
            return ;
        }
    }
    async function saveMessagesToLocalStorage(chats , name , id){
        const storedChats = JSON.parse(localStorage.getItem('chats')) || [];
        let msgIdExists = false;
        for(let i =0 ; i < storedChats.length ; i++){
            if(storedChats[i].id === id){
                msgIdExists = true;
                break;
            }
        }
        if(!msgIdExists){
            storedChats.push({chats:chats,name:name, id:id});
            
            if(storedChats.length > 10){
                storedChats.shift();
            }
            localStorage.setItem('chats' , JSON.stringify(storedChats));
        }
    }

    let msgId=fetchMessagesFromLocalStorage();
    sendBtn.addEventListener('click',async (event) => {
        event.preventDefault(); 
        const chats = chatsInput.value.trim();
    
        try {
            const response = await axios.post('http://localhost:3000/chat-app/add-chats', { chats }, {
                headers: { 'Authorization': token }
            });
            console.log('Message sent successfully:', response.data);
            chatsInput.value = '';
            alert('Message sent and stored successfully!');
            addMessageToChatUi(chats,loggedInUser); 
            saveMessagesToLocalStorage(chats,loggedInUser,response.data.newchat.id);
            msgId = response.data.newchat.id;
        } catch (error) {
            console.error('Error sending message:', error);
            alert('An error occurred while sending the message');
        }
    })

    chatsInput.addEventListener('keydown' , (event) => {
        if(event.key === "Enter"){
            sendBtn.click();
        }
    })
    

    async function fetchMessages(){
        try {
            const pre = document.getElementById('users-list');
            pre.innerHTML = '';
            const response = await axios.get(`http://localhost:3000/chat-app/get-chats?lastId=${msgId}`, {
                headers: { 'Authorization': token }
            });
            console.log('Fetched response:', response.data);
    
            response.data.chat.forEach(chat => {
               addMessageToChatUi(chat.chats , chat.name);
               saveMessagesToLocalStorage(chat.chats , chat.name , chat.id);
               msgId = chat.id;
            });
            
        } catch (error) {
            console.error('Error fetching message:', error);
            alert('An error occurred while fetching the message');
        }
    }
    // setInterval(() => {
    //     fetchMessages();
    // }, 1000);
})