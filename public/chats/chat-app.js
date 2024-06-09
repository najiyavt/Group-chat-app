document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem('token');
    const chatsInput = document.getElementById('chats-input');
    const sendBtn = document.getElementById('sendBtn');
    const groupsList = document.getElementById('groups-list');
    const createGroupBtn = document.getElementById('createGroupBtn');
    const groupNameElement = document.getElementById('group-name');
    const groupMembers = document.getElementById('groupMembers');

    let loggedInUser = '';
    let currentGroupId = null;
    
    if(token){
        const payload = JSON.parse(atob(token.split('.')[1]));
        loggedInUser = payload.name;
        console.log('Logged in user: ', loggedInUser);
    }else{
        window.location.href = '../login/login.html';
        return;
    }

     // Function to add a message to the chat UI
    function addMessageToChatUi(message,sender) {
        const chatBox = document.getElementById('chat-box');
        const messageElement = document.createElement('div');
        messageElement.innerHTML = `<strong>${sender === loggedInUser ? 'You' : sender}:</strong> ${message}`;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
        
    }

    addMessageToChatUi('',loggedInUser);

    // Function to fetch messages from local storage
    async function fetchMessagesFromLocalStorage(groupId){
        const groupChatMessages = `chatMessages_group_${groupId}`
        const chats = JSON.parse(localStorage.getItem('chats')) || [];
        chats.forEach(chat => addMessageToChatUi(chat.chats , chat.name));
        return chats.length > 0 ? chats[chats.length - 1].id : 0;
    }

    // Function to save messages to local storage
    async function saveMessagesToLocalStorage(chats , name , id , groupId){
        const groupChatMessages = `chatMessages_group_${groupId}`
        const storedChats = JSON.parse(localStorage.getItem('chats')) || [];
        if(!storedChats.some(chat => chat.id === id)){
            storedChats.push({chats,name, id});
            if(storedChats.length > 10){
                storedChats.shift();
            }
            localStorage.setItem('chats' , JSON.stringify(storedChats));
        }
    };

    if(currentGroupId){
        let msgId = fetchMessagesFromLocalStorage(currentGroupId);
    }

    sendBtn.addEventListener('click',async () => {
        const chats = chatsInput.value.trim();
        
        if(chats && currentGroupId){
            try {
                const response = await axios.post(`http://localhost:3000/chat-app/add-chats`, {chats:chats ,groupId:currentGroupId}, {
                    headers: { 'Authorization': token }
                });
                addMessageToChatUi(chats, loggedInUser);
                saveMessagesToLocalStorage(chats, loggedInUser, response.data.newchat.id);
                
                chatsInput.value = '';
                msgId = response.data.newchat.id;
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    })


    async function fetchMessages(){
        if(!currentGroupId) return
        try {
            const response = await axios.get(`http://localhost:3000/chat-app/get-chats?groupId=${currentGroupId}&lastId=${msgId}`, {
                headers: { 'Authorization': token }
            });
            response.data.chat.forEach(chat => {
               addMessageToChatUi(chat.chats , chat.User.name);
               saveMessagesToLocalStorage(chat.chats , chat.name , chat.id,currentGroupId);
               msgId = chat.id;
            });
        } catch (error) {
            console.error('Error fetching message:', error);
            alert('An error occurred while fetching the message');
        }
    }
    //setInterval(fetchMessages, 5000);


    async function fetchGroups(){
        try{
            const response = await axios.get('http://localhost:3000/groups/get-group', {
                headers: { 'Authorization': token }
            });
            groupsList.innerHTML = '';
            const groups = response.data.groups;

            groups.forEach(group => {
                const listItem = document.createElement('li');
                listItem.textContent = group.name;
                listItem.dataset.groupId = group.id;
                listItem.addEventListener('click', async () => {
                    currentGroupId = group.id;
                    groupNameElement.textContent = group.name;
                    msgId = await fetchMessagesFromLocalStorage();
                    fetchMessages();
                });

                const joinButton = document.createElement('button');
                joinButton.textContent = 'Join Group';
                joinButton.addEventListener('click', async () => {
                    try {
                        await axios.post(`http://localhost:3000/groups/join-group`, { groupId: currentGroupId }, {
                            headers: { 'Authorization': token }
                        });
                        alert('You have successfully joined the group!');
                    } catch (error) {
                        console.error('Error joining group:', error);
                        alert('Error joining group!');
                    }
                });

                const membersButton = document.createElement('button');
                membersButton.textContent = 'Group Members';
                membersButton.addEventListener('click', async () => {
                    try {
                        const response = await axios.get(`http://localhost:3000/groups/group-members?groupId=${currentGroupId}`, {
                            headers: { 'Authorization': token }
                        });
                        const members = response.data.members;
                        groupMembers.innerHTML = '<h2>Group Members</h2>';
                        const memberList = document.createElement('ul');
                        members.forEach(member => {
                            const memberItem = document.createElement('li');
                            memberItem.textContent = member;
                            memberList.appendChild(memberItem);
                        });
                        groupMembers.appendChild(memberList);
                        groupMembers.style.display = 'block';
                    } catch (error) {
                        console.error('Error fetching group members:', error);
                        alert('Error fetching group members!');
                    }
                });

                listItem.appendChild(joinButton);
                listItem.appendChild(membersButton);
                groupsList.appendChild(listItem);
            });
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
    }

    createGroupBtn.addEventListener('click', async () => {
        try{
            const groupName = prompt("Enter group name");
            if(!groupName) return ;
            await axios.post('http://localhost:3000/groups/create-group', { groupName }, {
                headers: { 'Authorization': token }
            });
            fetchGroups();
        } catch (error) {
            console.error('Error creating group:', error);
            alert("Error creating group!!!")
        }
    });

    fetchMessages()
    fetchGroups();
})
