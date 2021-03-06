const blogEntries = document.querySelector('.blog-entries');
const title = document.querySelector('.post-title');
const postBody = document.querySelector('.post-body');
const submitButton = document.querySelector('.submit-post');
const cancelButton = document.querySelector('.cancel-btn_new');

submitButton.addEventListener('click', () => {
  const post_title = title.value;
  const post_body = postBody.value;

  if (post_title === '' || post_body === '') {
    alert('New post requires at title and content.');
    return;
  }

  // prepare http request to be sent to the server
  let xhr = new XMLHttpRequest();

  xhr.open('POST', `/new-post/${post_title}`);

    if (confirm('Submit post?')) {
      console.log('post submitted')
      xhr.send(post_body);
    } else {
      console.log('Post not submitted')
    }
    // Reload the window to trigger repopulation of blog posts
    /* Using setTimeout to reload page after the posts have been reloaded
    from the database on the server. I realize that this is not a great
    solution as were this live on the internet there's no gaurantee that
    the server will have updated in time after the xhr.send() has been made. 
    */
    setTimeout(() => {
      window.location.reload(true);
    }, 500);
});

cancelButton.addEventListener('click', () => {
  newPostForm.classList.toggle('hidden');
  newPostButton.classList.toggle('hidden');
});