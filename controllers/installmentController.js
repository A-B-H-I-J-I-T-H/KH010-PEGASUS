// controllers/installmentController.js
const installmentModel = require('../models/installmentModel');

class InstallmentController {
  async handleInstallmentsForDay(day) {
    try {
      // Call the installmentModel to search for documents with inst_date equal to the provided day
      const result = await installmentModel.findInstallmentsForDay(day);
      
      // Perform any additional operations based on the result

      console.log(`Installments for day ${day}:`, result);
    } catch (error) {
      console.error('Error handling installments:', error.message);
    }
  }
}

module.exports = new InstallmentController();
