const newPostForm = document.querySelector('.create-post_form');
const newPostButton = document.querySelector('.new-post_button');

// Display the new post form when clicked while simultaneously hiding the button
newPostButton.addEventListener('click', () => {
  newPostForm.classList.toggle('hidden');
  newPostButton.classList.toggle('hidden');
})