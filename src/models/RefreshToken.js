import mongoose, { Schema, models, model } from 'mongoose';

const refreshToken = new Schema(
  {
    userId: { type: String },
    refreshToken: { type: String },
  },
  {
    timestamps: true,
  },
);

export default models.RefreshToken || model('RefreshToken', refreshToken);
