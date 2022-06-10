const editButtons = document.querySelectorAll('.edit-post');
const postBodies = document.querySelectorAll('.content');

const createEditPostHTML = (bodyText, postID) => {
    // Create new div to contain the textarea for editing
    const editDiv = document.createElement('div');
    editDiv.setAttribute('name', postID);
    let editTextarea = document.createElement('textarea');
    editTextarea.setAttribute('style', 'resize: none');
    editTextarea.setAttribute('class', 'edited-text');
    editTextarea.innerHTML = bodyText;

    // Create confirm or cancel buttons
    let cancelButton = document.createElement('input');
    cancelButton.setAttribute('type', 'button');
    cancelButton.setAttribute('class', 'cancel-btn');
    cancelButton.setAttribute('value', '❌');
    let confirmButton = document.createElement('input');
    confirmButton.setAttribute('type', 'button');
    confirmButton.setAttribute('class', 'confirm-btn')
    confirmButton.setAttribute('value', '✅');
    
    // Append created elements to editDiv
    editDiv.append(editTextarea);
    editDiv.append(cancelButton);
    editDiv.append(confirmButton);

    return editDiv;
}



// Add event listeners to 'Edit Post' buttons
for (let button of editButtons) {
  button.addEventListener('click', (e) => {
    const postID = e.target["name"];

    // Define behaviours for the cancel and submit buttons
    for (let postBody of postBodies) {
      if (postBody.getAttribute('name') === postID) {
        // Save the initial text content from the selected blog post
        const bodyText = postBody.innerHTML;

        // Generate the HTML that will replace the original while editing
        const editPostHTML = createEditPostHTML(bodyText, postID);

        // Get blog-post HTML from post clicked on 
        const currentPostStateWrapper = document.querySelector(
          `.post-wrapper${postID}`
        );

        /* Used to restore the title, edit/delete buttons and <p> section back to it's previous HTML state, with or without edits to the post-body */
        const currentPostState = currentPostStateWrapper.children;
        const postStateStaticCopy = [...currentPostState];

        // Convert post area HTML to one that can edit the body
        currentPostStateWrapper.innerHTML = '';
        currentPostStateWrapper.append(editPostHTML);
        
        // CANCEL EDIT BUTTON
        const cancelEditButton = document.querySelector('.cancel-btn');
        cancelEditButton.addEventListener('click', () => {
          // Revert HTML to it's original state before edit button was clicked
          currentPostStateWrapper.innerHTML = '';
          for (let element of postStateStaticCopy) {
            currentPostStateWrapper.append(element);
          }
        });

        // CONFIRM EDIT BUTTON
        const confirmEditButton = document.querySelector('.confirm-btn');
        confirmEditButton.addEventListener('click', () => {
          // Get the value from the textarea that user was editing
          const editedText = document.querySelector('.edited-text').value;

          //Clear the HTML for the edit box so blog HTML can be restored
          currentPostStateWrapper.innerHTML = '';

          // Update HTML with new edited post
          for (let element of postStateStaticCopy) {
            if (element.getAttribute('class') === 'content') {
              // Insert edited blog content into the content <p> for the post
              element.innerHTML = editedText;
            }
            currentPostStateWrapper.append(element);
          }
        });

        // Match between button and post found; break
        break;
      }
    }
  });
}
