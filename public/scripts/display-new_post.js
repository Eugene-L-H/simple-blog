const newPostForm = document.querySelector('.create-post_form');
const newPostButton = document.querySelector('.new-post_button');

// Display the new post form when clicked while simultaneously hiding the button
newPostButton.addEventListener('click', () => {
  console.log('Clicked on create new blog post button.')
  newPostForm.classList.toggle('hidden');
  newPostButton.classList.toggle('hidden');
})