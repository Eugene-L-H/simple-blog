const loginRegisterDiv = document.querySelector('.login-register');

const restoreLoginRegister = `
  <div class="login-register">
    <div class="login">
      <label for="login">Username:</label>
      <input type="text" name="login" placeholder="username"> 
      <label for="password">Password:</label>
      <input type="text" name="password" placeholder="password">
      <input type="button" class="submit-login" value="Login">
    </div>
    <div class="register">
      <p class="register-prompt">
        No account? <span class="click-register">REGISTER</span>
      </p>
    </div>
  </div>
`;

// Adds event listener to the REGISTER text under login prompt
// Generates the HTML for the registration form
const addOnclickToREGISTER = () => {
  const clickRegister = document.querySelector('.click-register');

  // Create HTML for the registration form "popup"
  const registrationForm = document.createElement('div');
  registrationForm.setAttribute('class', 'register-form');

  // Div to contain title and cancel button
  const titleDiv = document.createElement('div');
  titleDiv.setAttribute('class', 'registration-title_div');

  // Cancel button
  const cancelButton = document.createElement('input');
  cancelButton.setAttribute('type', 'button');
  cancelButton.setAttribute('class', 'cancel-registration');
  cancelButton.setAttribute('value', '❌');
  cancelButton.addEventListener('click', () => {
    loginRegisterDiv.innerHTML = '';
    loginRegisterDiv.innerHTML = restoreLoginRegister;
    // Restore event listener to login button
    addOnClickToLogin();
    // Restore event listener to "REGISTER" text under login form
    addOnclickToREGISTER();
  });

  // Registration form title
  const formTitle = document.createElement('p');
  formTitle.setAttribute('class', 'form-title');
  formTitle.innerHTML = 'Register';

  // Input Username
  const usernameLabel = document.createElement('label');
  usernameLabel.setAttribute('for', 'input-username');
  usernameLabel.innerHTML = 'New Username:';

  const inputUsername = document.createElement('input');
  inputUsername.setAttribute('class', 'input-username');
  inputUsername.setAttribute('type', 'text');
  inputUsername.setAttribute('placeholder', 'username');

  // Input Password
  const passwordLabel = document.createElement('label');
  passwordLabel.setAttribute('for', 'input-password');
  passwordLabel.innerHTML = 'New Password:';

  const inputpassword = document.createElement('input');
  inputpassword.setAttribute('class', 'input-password');
  inputpassword.setAttribute('type', 'text');
  inputpassword.setAttribute('placeholder', 'password');

  // Submit registration
  const submitRegistration = document.createElement('input');
  submitRegistration.setAttribute('type', 'button');
  submitRegistration.setAttribute('class', 'submit-registration');
  submitRegistration.setAttribute('value', 'Register');
  submitRegistration.addEventListener('click', () => submitRegistrationToDB());

  // Add the HTML elements to the parent div
  titleDiv.append(cancelButton);
  titleDiv.append(formTitle);
  registrationForm.append(titleDiv);
  registrationForm.append(usernameLabel);
  registrationForm.append(inputUsername);
  registrationForm.append(passwordLabel);
  registrationForm.append(inputpassword);
  registrationForm.append(submitRegistration);

  clickRegister.addEventListener('click', () => {
    loginRegisterDiv.innerHTML = '';
    loginRegisterDiv.append(registrationForm);
  });
}

// Add listener to the submit registration button
const submitRegistrationToDB = () => {
  const usernameEntered = document.querySelector('.input-username').value;
  const passwordEntered = document.querySelector('.input-password').value;
  if (usernameEntered === '' || passwordEntered === '') {
    alert('username or password fields can not be empty.');
    return;
  } 
  const params = `username=${usernameEntered}&password=${passwordEntered}`
  console.log(`username: ${usernameEntered}, password: ${passwordEntered}`)

  // prepare http request to be sent to the server
  let xhr = new XMLHttpRequest();
  xhr.open('POST', `/register-user`);

  if (confirm('Submit ?')) {
    console.log('Registration submitted')
    xhr.send(params);
  } else {
    console.log('Error Registering')
  }
  // Reload the window to trigger repopulation of blog posts
  window.location.reload(true);
}

// Add event listener to the REGISTER text under login prompt
addOnclickToREGISTER();