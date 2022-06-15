const newPostForm = document.querySelector('.create-post_form');
const newPostButton = document.querySelector('.new-post_button');

newPostButton.addEventListener('click', () => {
  console.log('Clicked on create new blog post button.')
  newPostForm.classList.toggle('hidden');
  newPostButton.classList.toggle('hidden');
})