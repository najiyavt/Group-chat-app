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
    }catch (error) {
        console.error( error);
        alert('An error occurred while logging in. Please try again.');
    }
}