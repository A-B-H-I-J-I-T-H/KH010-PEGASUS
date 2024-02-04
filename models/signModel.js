// models/signupModel.js
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

require('dotenv').config();

const mongoUri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

class SignupModel {
  async addUser(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
      await client.connect();
      const db = client.db(dbName);

      // Check if the username already exists
      const existingUser = await db.collection('users').findOne({ username });

      if (existingUser) {
        throw new Error('Username already exists.');
      }

      // If username doesn't exist, insert the new user
      await db.collection('users').insertOne({ username, password: hashedPassword });
    } finally {
      await client.close();
    }
  }
}

module.exports = new SignupModel();
