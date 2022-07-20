import { Schema, models, model } from 'mongoose';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  },
);

export default models.User || model('User', UserSchema);
