const express = require("express");
const res = require("express/lib/response");
const app = express();

const PORT = 8080;
app.set('view engine', 'ejs');

// MIDDLEWARE
const morgan = require('morgan');
app.use(morgan('dev'));

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
      console.log('Connected to database.')
      blogPosts = res.rows;
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

// Save new blog post
app.post('/new-post/:post_title/:post_body', (req, res) => {
  console.log('recieved incoming post')
  const postTitle = req.params['post_title'];
  const postBody = req.params['post_body'];
  const todayDate = new Date();
  postDate = todayDate.toISOString().split('T')[0];

  const addPost = `
    INSERT INTO blog_posts (author, title, content, post_date)
    VALUES ('${currentUser}', '${postTitle}', '${postBody}', '${postDate}')
  `;

  client.query(addPost, (err, res) => {
    if(!err) {
      console.log('Creating new post');
      retrieveBlogPostsFromDatabase();
    } else {
      console.log('Error creating post: ', err.message);
    }

  })
});

// Listen for incoming requests
app.listen(PORT, () => {
  console.log(`express_server listening on port ${PORT}`);
});