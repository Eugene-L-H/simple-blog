const editButtons = document.querySelectorAll('.edit-post');
const postBodies = document.querySelectorAll('.content');

for (let button of editButtons) {
  button.addEventListener('click', (e) => {

    const postID = e.target["name"];

    for (let postBody of postBodies) {
      if (postBody.getAttribute('name') === postID) {
        const bodyText = postBody.innerHTML;

        const editDiv = document.createElement('div');
        editDiv.setAttribute('name', postID);
        let editTextarea = document.createElement('textarea');
        editTextarea.setAttribute('style', 'resize: none');
        editTextarea.innerHTML = bodyText;
        editDiv.append(editTextarea);
        console.log('editTextArea: ', editDiv)
        // postBody = `
        //   <textarea style="resize: none">
        //     ${bodyText}
        //   </textarea>
        // `;

        postBody = editTextarea;
      }
    }
  });
}
