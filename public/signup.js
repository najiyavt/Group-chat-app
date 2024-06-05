async function signupPage (event) {
    event.preventDefault();
    const signupDetails = {
        name:event.target.name.value,
        email:event.target.email.value,
        number:event.target.number.value,
        password:event.target.password.value,
    }; 
}