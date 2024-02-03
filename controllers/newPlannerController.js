// controllers/newPlannerController.js
const newPlannerModel = require('../models/newPlannerModel');

class NewPlannerController {
   
  async createNewPlanner(req, res) {
    console.log("new planner controller");
    const username = req.params.user;
    const jsonContent = req.body;

    try {
      await newPlannerModel.createNewPlanner(username, jsonContent);
      res.status(201).json({ message: 'New planner created successfully.' });
    } catch (error) {
      console.error('Error creating new planner:', error.message);
      res.status(500).json({ error: 'An error occurred while creating a new planner.' });
    }
  }
}

module.exports = new NewPlannerController();
