const { MongoClient } = require('mongodb');
const validator = require('validator');
const bcrypt = require('bcrypt');

// Load environment variables using dotenv or any other method
require('dotenv').config();

// Use process.env to get environment variables
const mongoUri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

class UserModel {
  async getUserByUsernameAndPassword(username, password) {
    // Sanitize inputs
    const sanitizedUsername = validator.escape(username);
    const sanitizedPassword = validator.escape(password);

    const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
      await client.connect();
      const db = client.db(dbName);

      // Retrieve the user with the sanitized username
      const user = await db.collection('users').findOne({ username: sanitizedUsername });

      // Check if the user exists and if the hashed password matches
      if (user && await bcrypt.compare(sanitizedPassword, user.password)) {
        return user; // Passwords match
      } else {
        return null; // User not found or passwords do not match
      }
    } finally {
      await client.close();
    }
  }
}

module.exports = new UserModel();
