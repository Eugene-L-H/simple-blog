const deleteButtons = document.getElementsByClassName('delete-post');

for (let button of deleteButtons) {
  button.addEventListener('click', () => {
    alert('click!');
  });
}
