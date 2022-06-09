const editButtons = document.querySelectorAll('.edit-post');
const postBodies = document.querySelectorAll('.content');

const createEditPostHTML = (bodyText, postID) => {
    // Create new div to contain the textarea for editing
    const editDiv = document.createElement('div');
    editDiv.setAttribute('name', postID);
    let editTextarea = document.createElement('textarea');
    editTextarea.setAttribute('style', 'resize: none');
    editTextarea.innerHTML = bodyText;

    // Create confirm or cancel buttons
    let cancelButton = document.createElement('input');
    cancelButton.setAttribute('class', 'edit-btn');
    cancelButton.setAttribute('value', '❌');
    let confirmButton = document.createElement('input');
    confirmButton.setAttribute('class', 'edit-btn')
    confirmButton.setAttribute('value', '✅');
    
    // Append created elements to editDiv
    editDiv.append(editTextarea);
    editDiv.append(cancelButton);
    editDiv.append(confirmButton);

    return editDiv;
}


for (let button of editButtons) {
  button.addEventListener('click', (e) => {
    const postID = e.target["name"];

    for (let postBody of postBodies) {
      if (postBody.getAttribute('name') === postID) {
        const bodyText = postBody.innerHTML;

        const editPostHTML = createEditPostHTML(bodyText, postID);

        console.log('editPostHTML: ', editPostHTML)

      }
    }
  });
}
