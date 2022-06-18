const express = require("express");
const res = require("express/lib/response"); // do I need this?
const app = express();

const PORT = 8080;
app.set('view engine', 'ejs');

// MIDDLEWARE
const morgan = require('morgan');
app.use(morgan('dev'));

const bodyParser = require('body-parser');
app.use(bodyParser.text({ type: "text/plain" }));

// Password encryption
const bcrypt = require('bcryptjs');

// Use static module so client-side js can be linked to ejs file
const path = require("path");
app.use(express.static(path.join(__dirname, 'public')));


// GLOBAL VARIABLES
let loggedIn = false;
let currentUser = ''; // user who is currently logged in

// CONNECT TO DATABASE
const { Client } = require('pg');
const { name } = require("ejs");

const client = new Client({
  host: 'localhost',
  user: 'labber',
  password: 'labber',
  database: 'simpleblog',
  port: 5432
})

client.connect();

let blogPosts;

// Pull blog posts from database submitted by current user
const retrieveBlogPostsFromDatabase = () => {
  client.query(`SELECT * FROM blog_posts WHERE author = '${currentUser}'`, (err, res) => {
    if(!err) {
      console.log('Fetching posts from database.')
      blogPosts = res.rows;
      blogPosts = blogPosts.sort((a, b) => {
        return a.post_date - b.post_date;
      });
    } else {
      console.log('Error retrieving posts: ', err.message);
    }
    // client.end; - don't think I need this..
  });
}

retrieveBlogPostsFromDatabase();

// POST ROUTES

// User Login
app.post('/login/:username', (req, res) => {
  const username = req.params.username;
  const password = req.body;

  const getPasswordFromDB = `
    SELECT user_password FROM users
    WHERE user_name = '${username}'
  `;

  client.query(getPasswordFromDB, (err, queryResults) => {
    if(!err) {
      // If compareSync with provided password passes credentials are valid
      if(bcrypt.compareSync(password, queryResults.rows[0]['user_password'])) {
        loggedIn = true;
        currentUser = username;
        console.log(`Logging ${currentUser} in...`);

        // Load posts from database authored by logged in user
        retrieveBlogPostsFromDatabase();
        res.render('index', { blogPosts, currentUser, loggedIn })
      } else {
        console.log('Username or password does not match.')
        res.send('Username or password does not match.')
      }
    } else {
      console.log('Error: ', err.message);
    }
  });

});

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
      return res.render('index', { blogPosts, currentUser, loggedIn });
    } else {
      console.log('Error creating post: ', err.message);
    }
  });
});

// Register new user
app.post('/register-user', (req, res) => {
  console.log('Registration data recieved');
  const registrationQueryString = req.body;

  // Convert query-string to JS object extract username + password
  const nameAndPassword = JSON.parse('{"' + registrationQueryString.replace(/&/g, '","').replace(/=/g,'":"') + '"}', (key, value) => { return key===""?value:decodeURIComponent(value) });

  const username = nameAndPassword['username'];
  const password = nameAndPassword['password'];
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Prevent users with empty username or password from being registered
  if(username === '' || password === '') {
    return res
      .status(400)
      .send('Both password and email fields must be filled out to register.');
  }

  // TODO: HASH/ENCRYPT PASSWORD BEFORE SUBMITTING *

  const registerUser = `
    INSERT INTO users (user_name, user_password)
      VALUES ('${username}', '${hashedPassword}');
  `;

  client.query(registerUser, (err, res) => {
    if(!err) {
      console.log(`${username} registered as a user in the database.`);
      retrieveBlogPostsFromDatabase();
    } else {
      console.log('Error registering user: ', err.message);
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

// GET ROUTES

// Log user out
app.get('/logout', (req, res) => {
  loggedIn = false;
  currentUser = '';
  
  return res.render('index', {blogPosts, currentUser, loggedIn});
});

// Render main page
app.get('/', (req, res) => {
  res.render('index', { blogPosts, currentUser, loggedIn });
});


// Listen for incoming requests
app.listen(PORT, () => {
  console.log(`express_server listening on port ${PORT}`);
});