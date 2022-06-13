const loginRegisterDiv = document.querySelector('.login-register');

const restoreLoginRegister = `
  <div class="login-register">
  <div class="login">
    <label for="login">Username:</label>
    <input type="text" name="login" placeholder="username"> 
    <label for="password">Password:</label>
    <input type="text" name="password" placeholder="password">
  </div>
  <div class="register">
    <p class="register-prompt">
      No account? <span class="click-register">REGISTER</span>
    </p>
  </div>
  </div>
`;

// Adds event listener to the REGISTER text under login prompt
const addListenerToClickRegister = () => {
  const clickRegister = document.querySelector('.click-register');
  clickRegister.addEventListener('click', () => {
    loginRegisterDiv.innerHTML = '';
    loginRegisterDiv.append(registrationForm);
  });
}

// Create HTML for the registration form "popup"
const registrationForm = document.createElement('div');
registrationForm.setAttribute('class', 'register-form');

// Cancel button
const cancelButton = document.createElement('input');
cancelButton.setAttribute('type', 'button');
cancelButton.setAttribute('class', 'cancel-registration');
cancelButton.setAttribute('value', '❌');
cancelButton.addEventListener('click', () => {
  loginRegisterDiv.innerHTML = '';
  loginRegisterDiv.innerHTML = restoreLoginRegister;
  addListenerToClickRegister();
});

// Div title
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

registrationForm.append(cancelButton);
registrationForm.append(formTitle);
registrationForm.append(usernameLabel);
registrationForm.append(inputUsername);
registrationForm.append(passwordLabel);
registrationForm.append(inputpassword);

// Add event listener to the REGISTER text under login prompt
addListenerToClickRegister();