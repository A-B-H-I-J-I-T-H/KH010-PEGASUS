// models/newPlannerModel.js
const { MongoClient } = require('mongodb');

const mongoUri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

class NewPlannerModel {
  async createNewPlanner(username, jsonContent) {
    console.log("new planner model");

    const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
      await client.connect();
      const db = client.db(dbName);

      // Create or get the collection for the specified user
      const collection = db.collection(username);

      // Insert the JSON content as a new document in the collection
      await collection.insertOne(jsonContent);
    } finally {
      await client.close();
    }
  }
}

module.exports = new NewPlannerModel();
