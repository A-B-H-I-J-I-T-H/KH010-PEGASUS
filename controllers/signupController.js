// controllers/signupController.js
const signupModel = require('../models/signModel');
const signupView = require('../views/signupView');

class SignupController {
  renderSignupPage(req, res) {
    signupView.renderSignup(res, req.flash('error'));
  }

  async signup(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    // Check if password is valid
    if (!isValidPassword(password)) {
      req.flash('error', 'Password must have one capital letter, one small letter, and one number, and be between 8 and 15 characters.');
      return res.redirect('/signup');
    }

    try {
      await signupModel.addUser(username, password);
      res.redirect('/login');
    } catch (error) {
      console.error('Error during signup:', error.message);
      req.flash('error', error.message);
      res.redirect('/signup');
    }
  }
}

// Function to check if password is valid
function isValidPassword(password) {
  // Check if password length is between 8 and 15 characters and contains at least one capital letter, one small letter, and one number
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/.test(password);
}

module.exports = new SignupController();
