const addOnClickToLogin = () => {
  const loginButton = document.querySelector('.submit-login');
  const usernameField = document.querySelector('.username-field');
  const passwordField = document.querySelector('.password-field');

  loginButton.addEventListener('click', () => {
    const username = usernameField.value;
    const password = passwordField.value;

    if (username === '' || password === '') {
      console.log('Can not login: empty credential fields');
      return;
    }
  
    const xhr = new XMLHttpRequest();
    xhr.open('POST',`/login/${username}` );
  
    // *TODO: Perhaps encrypt password before sending to database? Look-up
  
    xhr.send(password);
  
    // TODO: Reload page after recieving response from server.
    // A hack-ey workaround to reloading the page after login (await?):
    setTimeout(() => {
      window.location.reload(true);
    }, 500);
  });
}

addOnClickToLogin();