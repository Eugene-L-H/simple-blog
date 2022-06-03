const populateBlogEntries = (blogs) => {
  blogs.forEach(blog => {
    let blogPost = `
    <p>${blog['title']}, by ${blog['author']}</p>
    <p>${blog['contnet']}</p>
    <p>${blog['date']}</p>
    `
    blogEntries.appendChild(blogPost);
  });
}