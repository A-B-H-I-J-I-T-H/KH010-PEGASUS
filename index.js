// index.js
const express = require('express');
const app = express();
const loginController = require('./controllers/loginController');
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

// Render login page for both GET and POST requests to root
app.route('/')
  .get(loginController.renderLoginPage)
  .post(loginController.login);

// Render login page for GET request to /login
app.get('/login', loginController.renderLoginPage);

// Handle login form submission for POST request to /login
app.post('/login', loginController.login);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
