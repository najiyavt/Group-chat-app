async function loginSubmit (event) {
    event.preventDefault();
    const loginDetails = {
        email:document.getElementById('email').value,
        password:document.getElementById('password').value
    }
    try{
        const response = await axios.post(`http://localhost:3000/user/login`, loginDetails);
        localStorage.setItem('token',response.data.token);
        console.log('Login details',response);
        alert('Login successfull');
        window.location.href = '../chats/chats.html';
    }catch (error) {
        console.error('Error logging in:', error);
        alert('Login failed. Please check your credentials and try again.');
    }
}