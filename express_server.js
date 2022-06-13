const express = require("express");
const res = require("express/lib/response");
const app = express();

const PORT = 8080;
app.set('view engine', 'ejs');

// MIDDLEWARE
const morgan = require('morgan');
app.use(morgan('dev'));

const bodyParser = require('body-parser');
app.use(bodyParser.text({ type: "text/plain" }));

// Use static module so client-side js can be linked to ejs file
const path = require("path");
app.use(express.static(path.join(__dirname, 'public')));


// GLOBAL VARIABLES
const currentUser = 'Eugene'; // user who is currently logged in

// CONNECT TO DATABASE
const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  user: 'labber',
  password: 'labber',
  database: 'simpleblog',
  port: 5432
})

client.connect();

let blogPosts;

const retrieveBlogPostsFromDatabase = () => {
  client.query(`SELECT * FROM blog_posts WHERE author = '${currentUser}'`, (err, res) => {
    if(!err) {
      console.log('Fetching posts from database.')
      blogPosts = res.rows;
      blogPosts = blogPosts.sort((a, b) => {
        return b.post_date - a.post_date;
      });
    } else {
      console.log(err.message);
    }
    client.end;
  });
}

retrieveBlogPostsFromDatabase();

// GET ROUTES
app.get('/', (req, res) => {
  res.render('index', { blogPosts, currentUser });
});

// POST ROUTES

// DELETE post
app.post('/:post_id/delete', (req, res) => {

  console.log('Delete request recieved');
  const post_id = req.params['post_id'];

  const deletePost = `
    DELETE FROM blog_posts
    WHERE ID = ${post_id}
    AND author = '${currentUser}'
  `;

  client.query(deletePost, (err, res) => {
    if(!err) {
      console.log('Deleting post from db');
      // Refresh blogPosts variable with updated database
      retrieveBlogPostsFromDatabase();
    } else {
      console.log('Error deleting post: ', err.message);
    }
  });
});

// CREATE new blog post
app.post('/new-post/:post_title', (req, res) => {
  console.log('recieved incoming post')
  const postTitle = req.params['post_title'];
  const postBody = req.body;
  const todayDate = new Date();
  postDate = todayDate.toISOString().split('T')[0];
  
  const addPost = `
  INSERT INTO blog_posts (author, title, content, post_date)
  VALUES ('${currentUser}', '${postTitle}', '${postBody}', '${postDate}')
  `;
  
  client.query(addPost, (err, respond) => {
    if(!err) {
      console.log('Creating new post');
      retrieveBlogPostsFromDatabase();
      return res.render('index', { blogPosts, currentUser });
    } else {
      console.log('Error creating post: ', err.message);
    }
  });
});

// UPDATE blog post content from user edit
app.post('/edit-post/:post_ID', (req, res) => {
  console.log('Sever recieved edited post')

  const editedContent = `
    UPDATE blog_posts
    SET content = '${req.body}'
    WHERE id = ${req.params['post_ID']};
  `;

  client.query(editedContent, (err, res) => {
    if(!err) {
      console.log('Blog post content updated');
      retrieveBlogPostsFromDatabase();
    } else {
      console.log('Error updating content: ', err.message);
    }
  });
})

// Listen for incoming requests
app.listen(PORT, () => {
  console.log(`express_server listening on port ${PORT}`);
});