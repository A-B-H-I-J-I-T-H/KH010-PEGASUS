// controllers/dashboardController.js
class DashboardController {
    renderDashboardPage(req, res) {
      const username = req.params.username;
      res.send(`Hello ${username}`);
    }
  }
  
  module.exports = new DashboardController();
  