// views/loginView.js
const path = require('path');

class LoginView {
  renderLogin(res, flashMessage) {
    // Render the login.ejs file with flashMessage
    res.render('login', { flashMessage });
    console.log('hello')
  }

  renderSuccess(user) {
    console.log(`Login successful. Welcome, ${user.username}!`);
  }

  renderFailure(res, flashMessage) {
    // Redirect to the login page with flash message
    this.renderLogin(res, flashMessage);
  }

  renderError(res) {
    res.status(500).send('An error occurred during login.');
  }
}

module.exports = new LoginView();
