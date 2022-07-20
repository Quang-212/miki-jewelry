import { Schema, models, model } from 'mongoose';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unque: true,
      require: true,
    },
    password: {
      type: String,
      require: true,
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
