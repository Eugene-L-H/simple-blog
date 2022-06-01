const express = require("express");
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