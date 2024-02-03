// models/installmentModel.js
const { MongoClient } = require('mongodb');

const mongoUri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

class InstallmentModel {
  async findInstallmentsForDay(day) {
    const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
      await client.connect();
      const db = client.db(dbName);

      // Search for documents in installment_date collection with inst_date equal to the provided day
      const collection = db.collection('installment_date');
      const result = await collection.find({ inst_date: day }).toArray();

      return result;
    } finally {
      await client.close();
    }
  }
}

module.exports = new InstallmentModel();
