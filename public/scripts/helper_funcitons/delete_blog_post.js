const deleteButtons = document.getElementsByClassName('delete-post');

for (let button of deleteButtons) {
  button.addEventListener('click', () => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      console.log('Post deleted')
    } else {
      console.log('Not deleted')
    }
  });
}
