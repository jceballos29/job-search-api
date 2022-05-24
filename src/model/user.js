/** @format */

const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

/* This is creating a schema for the user model. */
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['applicant', 'employer', 'admin'],
      default: 'applicant',
    },
  },
  {
    collection: 'users',
    timestamps: true,
    versionKey: false,
  }
);

/* This is a plugin that allows us to soft delete a user. */
userSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

/* Creating a model for the user schema. */
const User = mongoose.model('User', userSchema);

module.exports = User;
