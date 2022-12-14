import { model, models, Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    googleId: { type: String },
    facebookId: { type: String },
    userName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    search: { type: String, required: true },
    password: { type: String, required: true, min: 8, default: process.env.DEFAULT_OAUTH_PASSWORD },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    gender: { type: String, enum: ['male', 'female', 'others'], default: 'others' },
    profilePicture: { url: { type: String }, public_id: { type: String } },
    birthday: { type: Date },
    phone: { type: String, default: null },
    consumerSpending: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['active', 'banned', 'deleted'],
      default: 'active',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default models.User || model('User', UserSchema);
