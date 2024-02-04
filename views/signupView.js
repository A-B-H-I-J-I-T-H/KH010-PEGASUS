// views/signupView.js
class SignupView {
    renderSignup(res, errorMessage) {
      res.render('signup', { errorMessage });
    }
  }
  
  module.exports = new SignupView();
  