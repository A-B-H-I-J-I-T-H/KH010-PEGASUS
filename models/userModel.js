// models/userModel.js
const { MongoClient } = require('mongodb');

// Load environment variables using dotenv or any other method
require('dotenv').config();

// Use process.env to get environment variables
const mongoUri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME ;

class UserModel {
  async getUserByUsernameAndPassword(username, password) {
    const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
      await client.connect();
      const db = client.db(dbName);

      const user = await db.collection('users').findOne({ username, password });

      return user;
    } finally {
      await client.close();
    }
  }
}

module.exports = new UserModel();
