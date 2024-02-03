// controllers/loginController.js
const userModel = require('../models/userModel');
const loginView = require('../views/loginView');

class LoginController {
  renderLoginPage(req, res, flashMessage) {
    loginView.renderLogin(res, flashMessage);
  }

  async login(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    try {
      // Additional checks for username and password
      if (!isValidUsername(username) || !isValidPassword(password)) {
        loginView.renderFailure(res, 'Invalid username or password.');
        return;
      }

      const user = await userModel.getUserByUsernameAndPassword(username, password);

      if (user) {
        loginView.renderSuccess(user);
      } else {
        // Use flash message for login failure
        this.renderLoginPage(req, res, 'Login failed. Invalid username or password.');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      loginView.renderError(res);
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
  // Check if password length is between 8 and 15 characters
  return password.length >= 8 && password.length <= 15;
}

module.exports = new LoginController();
