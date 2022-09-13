import { model, models, Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, min: 8 },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    gender: { type: String },
    image: { type: String },
    birthday: { type: Date },
    consumerSpending: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default models.User || model('User', UserSchema);
