const express = require("express");
const res = require("express/lib/response");
const app = express();
const PORT = 8080;
app.set('view engine', 'ejs');

// MIDDLEWARE
const morgan = require('morgan');
app.use(morgan('dev'));

// HELPER FUNCTIONS

// GLOBAL VARIABLES
const tempBlogsArr = [
  // Temporary hard code for blog entries. To be replaced with database values
  {
    'author': 'Eugene',
    'title': 'Heartbroken and Frustrated',
    'content': 'This would be the content for the first blog post.',
    'date': '2022-05-15'
  },
  {
    'author': 'Eugene',
    'title': 'Happy Birthday Mom',
    'content': 'This would be the content for the first blog post. Happy birthday Mom',
    'date': '2022-03-31'
  },
  {
    'author': 'Eugene',
    'title': 'Happy B-day Dad',
    'content': 'This would be the content for the first blog post. Dad, Happy Birthday.',
    'date': '2022-01-05'
  },
  {
    'author': 'Eugene',
    'title': 'Merry Christmas!',
    'content': 'This would be the content for the fourth blog post. Merry Christmas.',
    'date': '2021-12-25'
  },
]

// Listen for incoming requests

app.listen(PORT, () => {
  console.log(`express_server listening on port ${PORT}`)
});

// GET ROUTES

app.get('*', (req, res) => {
  res.render('index', { tempBlogsArr });
})