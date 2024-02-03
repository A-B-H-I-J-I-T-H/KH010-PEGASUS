// models/installmentModel.js
const { MongoClient } = require('mongodb');
const sendEmail = require('../utils/emailSender');

const mongoUri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

class InstallmentModel {
  async findInstallmentsForDay(day) {
    const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
      await client.connect();
      const db = client.db(dbName);

      const collection = db.collection('installment_date');
      const result = await collection.find({ inst_date: day }).toArray();

      if (result.length > 0) {
        for (const installment of result) {
          const username = installment.username;
          const topic = installment.topic;

          const userCollection = db.collection(username);
          const userDocument = await userCollection.findOne({ topic: topic });

          if (userDocument && userDocument.email) {
            const toEmail = userDocument.email;
            const emailSubject = 'Payment Due';
            const emailText = `Dear ${username},\n\nYour payment for ${topic} is due. Please make the payment promptly.`;

            // Call the sendEmail function to send the email
            await sendEmail(toEmail, emailSubject, emailText);
          }
        }
      }

      return result;
    } finally {
      await client.close();
    }
  }
}

module.exports = new InstallmentModel();
