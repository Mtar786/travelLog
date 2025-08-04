const mongoose = require('mongoose');

/**
 * User schema defines how user documents are stored in MongoDB.
 *
 * Fields:
 *  - name: the user's display name
 *  - email: unique email address used for login
 *  - password: hashed password
 *
 * Timestamps are enabled to automatically record createdAt and updatedAt fields.
 */
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);