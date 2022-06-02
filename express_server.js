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

// Listen for incoming requests

app.listen(PORT, () => {
  console.log(`express_server listening on port ${PORT}`)
});

// GET ROUTES

app.get('*', (req, res) => {
  res.render('home');
})