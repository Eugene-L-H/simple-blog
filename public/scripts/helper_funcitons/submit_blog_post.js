const submitButton = document.querySelector('.submit-post');
const title = document.querySelector('.post-title');
const postBody = document.querySelector('.post-body');

submitButton.addEventListener('click', () => {
  const post_title = title.value;
  const post_body = postBody.value;

  // prepare http request to be sent to the server
  let xhr = new XMLHttpRequest();
  xhr.open('POST', `/new-post/${post_title}/${post_body}`);

    if (confirm('Submit post?')) {
      console.log('post submitted')
      xhr.send();
    } else {
      console.log('Post not submitted')
    }
});