const logoutButton = document.querySelector('.logout-button');

logoutButton.addEventListener('click', () => {
  if(confirm('Logout?')) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/logout');

    xhr.send();

    // TODO: Reload page after recieving response from server.
    // A hack-ey workaround to reloading the page after login (await?):
    setTimeout(() => {
      window.location.reload(true);
    }, 500);
  } else {
    console.log('Staying logged in as: ', currentUser);
  }
});