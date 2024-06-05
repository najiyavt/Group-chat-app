document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('form').addEventListener('submit', async (event) => {
        const loginDetails = {
            email:document.getElementById('email').value,
            password:document.getElementById('password').value
        }
        try{
            const response = await axios.get(`http://localhost:3000/user/login/${email}/${password}`);
            console.log('Login details',response);
            alert('Login successful');
        }catch (error) {
            console.error( error);
            alert('An error occurred while log in. Please try again.');
        }
    })
})