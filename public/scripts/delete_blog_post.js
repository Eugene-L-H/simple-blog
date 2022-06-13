const blogPostHTML = document.getElementsByClassName('post-wrapper');
const deleteButtons = document.getElementsByClassName('delete-post');

for (let button of deleteButtons) {
  button.addEventListener('click', () => {
    let postID = button.getAttribute('name');
    
    // prepare http request to be sent to the server
    let xhr = new XMLHttpRequest();
    xhr.open('POST', `/${postID}/delete`);

    if (confirm('Are you sure you want to delete this blog post?')) {
      for (let post of blogPostHTML) {
        console.log('post: ', post)
        let wrapperID = post.getAttribute('name');
        console.log('wrapperID ', wrapperID, ' vs ', 'postID', postID)

        // Delete HTML of post that has the same id number as the button
        if (wrapperID === postID) {
          post.remove(); // Remove post from client-side
          xhr.send(); // Send request to server
        } 
      }
    } else {
      console.log('An error occured, post not deleted.')
    }
  });
}
