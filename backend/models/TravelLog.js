const mongoose = require('mongoose');

/**
 * TravelLog schema stores a single trip record created by a user.
 *
 * Fields:
 *  - user: reference to the User who owns this log
 *  - title: trip title
 *  - location: location name or address
 *  - date: date of the trip
 *  - description: detailed description of the experience
 *  - imageUrl: optional URL for an image associated with the trip
 *
 * Timestamps are enabled to automatically record createdAt and updatedAt fields.
 */
const TravelLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('TravelLog', TravelLogSchema);