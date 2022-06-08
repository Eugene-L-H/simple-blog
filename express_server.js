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

client.query(`SELECT * FROM blog_posts WHERE author = '${currentUser}'`, (err, res) => {
  if(!err) {
    console.log('inside no-error block.')
    blogPosts = res.rows;
  } else {
    console.log(err.message);
  }
  client.end;
});

console.log(blogPosts)

// GET ROUTES
app.get('/', (req, res) => {
  res.render('index', { blogPosts });
})

// POST ROUTES
app.post('/')

// Listen for incoming requests
app.listen(PORT, () => {
  console.log(`express_server listening on port ${PORT}`)
});