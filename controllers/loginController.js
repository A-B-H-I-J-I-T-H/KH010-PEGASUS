// controllers/loginController.js
const userModel = require('../models/userModel');
const loginView = require('../views/loginView');

class LoginController {
  renderLoginPage(req, res) {
    loginView.renderLogin(res, req.flash('error'));
  }

  async login(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    try {
      // Additional checks for username and password
      if (!isValidUsername(username) || !isValidPassword(password)) {
        req.flash('error', 'Invalid username or password.');
        return res.redirect('/login'); // Redirect to the login page
      }

      const user = await userModel.getUserByUsernameAndPassword(username, password);
      console.log(user);
      if (user) {
        loginView.renderSuccess(res,user);
      } else {
        req.flash('error', 'Invalid username or password.');
        return res.redirect('/login'); // Redirect to the login page
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      req.flash('error', 'An error occurred during login.');
      res.redirect('/login'); // Redirect to the login page
    }
  }
}

// Function to check if username is valid
function isValidUsername(username) {
  // Check if username doesn't start with a number
  return /^[^0-9]/.test(username);
}

// Function to check if password is valid
function isValidPassword(password) {
  // Check if password length is between 8 and 15 characters and contains at least one capital letter, one small letter, and one number
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/.test(password);
}

module.exports = new LoginController();
