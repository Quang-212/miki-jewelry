import { model, models, Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
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
    role: {
      type: String,
      default: 'user',
    },
  },

  {
    timestamps: true,
  },
);

export default models.User || model('User', UserSchema);
