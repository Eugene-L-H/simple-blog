const addOnClickToLogin = () => {
  const loginButton = document.querySelector(".submit-login");
  const usernameField = document.querySelector(".username-field");
  const passwordField = document.querySelector(".password-field");

  loginButton.addEventListener("click", () => {
    const username = usernameField.value;
    const password = passwordField.value;

    if (username === "" || password === "") {
      console.log("Can not login: empty credential fields");
      return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `/login/${username}`, false);
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 404) {
        // console.log( xhr.responseText );

        // Display login error message above login form
        const errorMessage = document.querySelector('.login-error');
        errorMessage.classList.toggle('hidden');
      } else {
        setTimeout(() => {
          window.location.reload(true);
        }, 500);
      }
    };

    xhr.send(password);

    const reloadPage = () => {
      
    }
    // TODO: Reload page after recieving response from server.
    // A hack-ey workaround to reloading the page after login (await?):
 
  });
};

addOnClickToLogin();
