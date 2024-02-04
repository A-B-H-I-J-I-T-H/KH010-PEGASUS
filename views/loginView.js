// views/loginView.js
const path = require('path');

class LoginView {
  renderLogin(res, flashMessage) {
    res.render('login', { flashMessage });
  }

  renderSuccess(res,user) {
    console.log(`Login successful. Welcome, ${user.username}!`);
    res.redirect(`/${user.username}/dashboard`);
  }

  renderError(res) {
    res.status(500).send('An error occurred during login.');
  }
}

module.exports = new LoginView();
