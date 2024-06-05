async function signupPage (event) {
    event.preventDefault();
    const signupDetails = {
        name:event.target.name.value,
        email:event.target.email.value,
        number:event.target.number.value,
        password:event.target.password.value,
    }; 
    console.log(signupDetails)
    try{
        const response = await axios.post('http://localhost:3000/user/signup', signupDetails);
        console.log('signed succesffully' ,response);
        alert('Succesfully signed');
    }catch(error){
        console.log(error);
        alert('an error encounterd while signing up the page');
    }
}